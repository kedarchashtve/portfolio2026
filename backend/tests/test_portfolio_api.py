"""Backend API tests for Kedar's Growth Portfolio (case studies + status)."""
import os
import requests
import pytest

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://growth-dashboard-61.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# --- Root sanity ---
def test_root(session):
    r = session.get(f"{API}/")
    assert r.status_code == 200
    assert "Kedar" in r.json().get("message", "")


# --- Case studies list ---
def test_list_case_studies_returns_three_sorted(session):
    r = session.get(f"{API}/case-studies")
    assert r.status_code == 200, r.text
    data = r.json()
    assert isinstance(data, list)
    assert len(data) == 3, f"Expected 3 case studies, got {len(data)}"

    required = {"slug", "title", "problem", "strategy", "actions",
                "results", "tools", "metric_label", "metric_value",
                "image", "accent", "order"}
    for cs in data:
        missing = required - set(cs.keys())
        assert not missing, f"Missing fields {missing} in {cs.get('slug')}"
        assert isinstance(cs["actions"], list) and len(cs["actions"]) > 0
        assert isinstance(cs["results"], list) and len(cs["results"]) > 0
        assert isinstance(cs["tools"], list) and len(cs["tools"]) > 0
        assert "_id" not in cs, "MongoDB _id leaked in response"

    orders = [cs["order"] for cs in data]
    assert orders == sorted(orders), f"Not sorted by order: {orders}"
    slugs = [cs["slug"] for cs in data]
    assert slugs == ["d2c-wellness", "multi-industry-agency", "growth-systems"]


# --- Case study by slug ---
def test_get_d2c_wellness_with_metric(session):
    r = session.get(f"{API}/case-studies/d2c-wellness")
    assert r.status_code == 200, r.text
    cs = r.json()
    assert cs["slug"] == "d2c-wellness"
    assert cs["metric_value"] == "+47%"
    assert cs["title"] == "D2C Wellness Brand"
    assert "_id" not in cs


def test_get_case_study_not_found(session):
    r = session.get(f"{API}/case-studies/non-existent")
    assert r.status_code == 404


# --- Status check create + list ---
def test_create_status_and_list_includes_it(session):
    payload = {"client_name": "TEST_portfolio_qa"}
    r = session.post(f"{API}/status", json=payload)
    assert r.status_code == 200, r.text
    created = r.json()
    assert "id" in created and isinstance(created["id"], str)
    assert "timestamp" in created
    assert created["client_name"] == "TEST_portfolio_qa"

    r2 = session.get(f"{API}/status")
    assert r2.status_code == 200
    items = r2.json()
    assert isinstance(items, list)
    ids = [i.get("id") for i in items]
    assert created["id"] in ids, "Created status not returned by GET /api/status"
