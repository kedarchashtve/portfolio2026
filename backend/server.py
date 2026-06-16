from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")


# --- Models ---
class CaseStudy(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    slug: str
    title: str
    subtitle: str
    tagline: str
    image: str
    accent: str
    problem: str
    strategy: str
    actions: List[str]
    results: List[str]
    tools: List[str]
    metric_label: str
    metric_value: str
    order: int = 0


class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


# --- Seed data ---
SEED_CASE_STUDIES = [
    {
        "slug": "d2c-wellness",
        "title": "D2C Wellness Brand",
        "subtitle": "Email + Meta Synergy",
        "tagline": "Turning subscribers into a compounding growth channel.",
        "image": "https://images.unsplash.com/photo-1644088379091-d574269d422f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NjV8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGRpZ2l0YWwlMjBub2RlcyUyMG5ldHdvcmslMjBkYXJrfGVufDB8fHx8MTc4MTYyNzgwNnww&ixlib=rb-4.1.0&q=85",
        "accent": "#7C3AED",
        "problem": "A direct-to-consumer wellness brand was struggling to grow its high-intent email list. Acquisition costs were rising on Meta and the retention engine was flat — every campaign felt like starting from zero.",
        "strategy": "I wired email nurturing and Meta campaigns into one feedback loop. Paid traffic fed segmented lists; email behavior fed the lookalike pools. The funnel started teaching itself who to target next.",
        "actions": [
            "Segmented audiences by intent and lifecycle stage",
            "Built email automation flows for welcome, browse-abandon and post-purchase",
            "Optimized Meta creatives weekly against email-engaged cohorts",
            "Set up cohort-level performance tracking across both channels"
        ],
        "results": [
            "+47% growth in qualified email subscribers in a single quarter",
            "Higher LTV from email-first customers vs. paid-first",
            "Reduced reliance on top-of-funnel paid spend"
        ],
        "tools": ["Meta Ads", "Klaviyo-style email flows", "GA4", "UTM frameworks"],
        "metric_label": "Email Subscriber Growth",
        "metric_value": "+47%",
        "order": 1,
    },
    {
        "slug": "multi-industry-agency",
        "title": "Multi-Industry Agency Clients",
        "subtitle": "Scaling Across 20+ Brands",
        "tagline": "One operating system, twenty different industries.",
        "image": "https://images.unsplash.com/photo-1515703944563-dbcfbf121b3d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxNzV8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjBhcmNoaXRlY3R1cmUlMjBkYXJrfGVufDB8fHx8MTc4MTYyNzgwNnww&ixlib=rb-4.1.0&q=85",
        "accent": "#06B6D4",
        "problem": "Twenty plus client brands across wildly different industries — wellness, SaaS, retail, services. Every account had its own reporting cadence, creative process, and campaign rhythm. Quality and consistency were impossible to hold at that scale.",
        "strategy": "I treated the agency itself as a product. Reusable workflows replaced bespoke ones. Templates, briefs and dashboards became shared infrastructure — so every new brand plugged into a system instead of starting from a blank page.",
        "actions": [
            "Managed 20+ brand accounts across paid, organic and email",
            "Automated weekly performance reports with templated dashboards",
            "Built repeatable content systems for social planning and approvals",
            "Standardized multi-channel campaign briefs across the agency"
        ],
        "results": [
            "20+ brands managed in parallel without quality drop",
            "Reporting time cut dramatically through automation",
            "Faster onboarding for every new client added to the roster"
        ],
        "tools": ["Meta Ads", "Google Ads", "Notion/Sheets workflows", "Content calendars"],
        "metric_label": "Brands Managed",
        "metric_value": "20+",
        "order": 2,
    },
    {
        "slug": "growth-systems",
        "title": "Growth Systems",
        "subtitle": "SEO · Social · Paid · Email · AI",
        "tagline": "Marketing channels aren't silos — they're a network.",
        "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAxODF8MHwxfHNlYXJjaHwxfHxkYXNoYm9hcmQlMjBkYXRhJTIwYWJzdHJhY3QlMjBkYXJrfGVufDB8fHx8MTc4MTYyNzgwNnww&ixlib=rb-4.1.0&q=85",
        "accent": "#A78BFA",
        "problem": "Most teams run SEO, social, paid, email and AI as five disconnected workstreams. The handoffs are messy, attribution is broken, and learnings die inside each channel.",
        "strategy": "I design growth as one interconnected system. SEO insights fuel social hooks. Social winners become paid creatives. Email behavior trains lookalikes. AI workflows compress the loop so the whole thing learns faster than any single channel could.",
        "actions": [
            "Mapped channel dependencies into a single growth graph",
            "Built AI-assisted research and reporting nodes",
            "Used winning organic content as paid testing fuel",
            "Created cross-channel attribution views for clearer decisions"
        ],
        "results": [
            "Channels compound instead of cannibalize",
            "Faster creative testing cycles with AI-assisted variants",
            "A repeatable framework for any new brand from day zero"
        ],
        "tools": ["GA4", "Meta Ads", "SEO tooling", "Email automation", "AI workflow stack"],
        "metric_label": "Connected Channels",
        "metric_value": "5×",
        "order": 3,
    },
]


# --- Routes ---
@api_router.get("/")
async def root():
    return {"message": "Kedar Chashtve — Growth Portfolio API"}


@api_router.get("/case-studies", response_model=List[CaseStudy])
async def list_case_studies():
    docs = await db.case_studies.find({}, {"_id": 0}).sort("order", 1).to_list(100)
    return [CaseStudy(**d) for d in docs]


@api_router.get("/case-studies/{slug}", response_model=CaseStudy)
async def get_case_study(slug: str):
    doc = await db.case_studies.find_one({"slug": slug}, {"_id": 0})
    if not doc:
        raise HTTPException(status_code=404, detail="Case study not found")
    return CaseStudy(**doc)


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check.get('timestamp'), str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


@app.on_event("startup")
async def seed_data():
    """Idempotent seed: replace case studies on every boot so edits to SEED show up."""
    try:
        await db.case_studies.delete_many({})
        await db.case_studies.insert_many([dict(c) for c in SEED_CASE_STUDIES])
        logger.info("Seeded %d case studies", len(SEED_CASE_STUDIES))
    except Exception as e:
        logger.exception("Seed failed: %s", e)


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
