from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")


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


# Public-facing capability snapshots. These are not presented as client case studies
# or measured campaign results; replace with approved, verified work when available.
SEED_CASE_STUDIES = [
    {
        "slug": "brand-storytelling",
        "title": "Brand Storytelling",
        "subtitle": "Positioning · Narrative · Identity",
        "tagline": "Finding the story that makes a brand easier to recognise and remember.",
        "image": "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
        "accent": "#7C3AED",
        "problem": "A brand can have a good product and still struggle to communicate what makes it distinct.",
        "strategy": "Start with the audience, category and brand point of view. Build a simple narrative that can guide communication across touchpoints.",
        "actions": [
            "Explore the audience and category context",
            "Clarify the central message and brand voice",
            "Translate the direction into repeatable content themes"
        ],
        "results": [
            "A clearer communication direction",
            "A consistent foundation for future creative work"
        ],
        "tools": ["Research", "Positioning", "Content strategy", "Creative direction"],
        "metric_label": "Focus",
        "metric_value": "Story",
        "order": 1,
    },
    {
        "slug": "social-content-systems",
        "title": "Social Content Systems",
        "subtitle": "Ideas · Formats · Publishing",
        "tagline": "Making social content feel connected instead of like a collection of random posts.",
        "image": "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
        "accent": "#06B6D4",
        "problem": "Without a clear content direction, social channels can become inconsistent and difficult to sustain.",
        "strategy": "Connect content pillars, audience interests and platform-native formats to a practical publishing rhythm.",
        "actions": [
            "Develop content pillars and recurring formats",
            "Shape ideas into hooks, scripts and creative briefs",
            "Plan publishing and review performance signals"
        ],
        "results": [
            "A more coherent content direction",
            "A repeatable process for planning and iteration"
        ],
        "tools": ["Social strategy", "Reels", "Creative briefs", "Content calendars"],
        "metric_label": "Focus",
        "metric_value": "Content",
        "order": 2,
    },
    {
        "slug": "campaign-thinking",
        "title": "Campaign Thinking",
        "subtitle": "Audience · Message · Distribution",
        "tagline": "Connecting the campaign idea to the people it needs to reach.",
        "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
        "accent": "#A78BFA",
        "problem": "Marketing activity is less effective when creative, audience and distribution are planned in isolation.",
        "strategy": "Treat the campaign as one connected system, with a clear objective and feedback loop between creative and performance.",
        "actions": [
            "Define the objective and audience",
            "Align the message with channel and format",
            "Review results and identify the next test"
        ],
        "results": [
            "A connected campaign planning approach",
            "Clearer learning for future iterations"
        ],
        "tools": ["Campaign planning", "Meta Ads", "Google Ads", "Performance reviews"],
        "metric_label": "Focus",
        "metric_value": "Growth",
        "order": 3,
    },
]


@api_router.get("/")
async def root():
    return {"message": "Kedar Chashtve — Marketing & Creative Portfolio API"}


@api_router.get("/case-studies", response_model=List[CaseStudy])
async def list_case_studies():
    docs = await db.case_studies.find({}, {"_id": 0}).sort("order", 1).to_list(100)
    return [CaseStudy(**doc) for doc in docs]


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
    """Replace public capability snapshots on startup so seed edits stay current."""
    try:
        await db.case_studies.delete_many({})
        await db.case_studies.insert_many([dict(item) for item in SEED_CASE_STUDIES])
        logger.info("Seeded %d capability snapshots", len(SEED_CASE_STUDIES))
    except Exception as error:
        logger.exception("Seed failed: %s", error)


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
