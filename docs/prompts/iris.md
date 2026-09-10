# IRIS — I RECEIVE I SEND

## AI-Powered Video Security & Remote Monitoring Platform

### MASTER CLAUDE CODE BUILD PROMPT

> Status: build brief / prompt of record. Stored here for version control.
> Target: a new standalone IRIS repository (not this site).

---

You are building **IRIS**, an enterprise-grade AI video security and remote monitoring SaaS platform.

**IRIS = I Receive I Send**

IRIS is intended to compete in the category of platforms such as ImageDeep and Spot AI, while initially focusing on small and midsize businesses that want to turn their existing security cameras into an intelligent 24/7 security system.

The goal is NOT to build a simple camera viewer.

The goal is to build the foundation of a complete:

> **AI SECURITY OPERATIONS PLATFORM**

The system must be designed from the beginning for multi-tenant SaaS, multiple businesses, multiple locations, multiple cameras, AI event detection, incident management, alerts, subscriptions, monitoring operators, and eventual human verification/emergency escalation.

---

# 1. ABSOLUTE DEVELOPMENT RULE

Build the application as a REAL, production-oriented software project.

Do NOT create a fake demo where buttons simply change screens.

Every major feature should have:

* Real data models
* Real API routes
* Real authentication
* Real database persistence
* Real state management
* Real validation
* Real error handling
* Real loading states
* Real empty states
* Real permissions
* Real audit logging
* Real security controls

Where a third-party AI/camera integration is not yet available, create a clean abstraction layer and a working development simulator so the application can be demonstrated without pretending that simulated events are real security events.

Clearly label simulated/development data.

Do not fabricate integrations or claim a camera/AI service is connected when it isn't.

---

# 2. FIRST STEP — INSPECT THE REPOSITORY

Before writing code:

1. Inspect the entire repository.
2. Determine whether an existing application already exists.
3. Identify the current framework, package manager, database, authentication system, styling system, and deployment configuration.
4. Reuse good existing infrastructure where appropriate.
5. Do not unnecessarily rewrite working code.
6. Create a concise architecture plan before making major changes.
7. Then implement the system.

If the repository is empty, initialize the project using a modern production-ready stack.

Preferred stack unless the repository already dictates otherwise:

* Next.js
* TypeScript
* PostgreSQL
* Prisma or equivalent type-safe ORM
* Tailwind CSS
* Component architecture
* REST or strongly typed API layer
* WebSockets/SSE where real-time updates are required
* Secure authentication
* Role-based access control

Use clean modular architecture so AI processing, camera ingestion, billing, notifications, and monitoring can evolve independently.

---

# 3. BRAND

Product name:

**IRIS**

Meaning:

**I Receive I Send**

Brand positioning:

> **IRIS sees what matters.**

Possible supporting language:

> Intelligent Security. Continuous Awareness.

The visual identity should feel:

* Premium
* Modern
* Trustworthy
* Serious
* Technological
* Security-focused
* Enterprise-ready

Avoid making the UI look like a generic cybersecurity template.

Avoid excessive neon, hacker aesthetics, skulls, locks everywhere, or cliché security graphics.

IRIS should feel like a legitimate company that a dealership, warehouse, restaurant, office, or enterprise would trust with its security infrastructure.

---

# 4. CORE PRODUCT CONCEPT

The fundamental architecture is:

CAMERA
↓
VIDEO INGESTION
↓
AI PROCESSING
↓
OBJECT DETECTION
↓
TRACKING
↓
RULES / ZONES
↓
EVENT CLASSIFICATION
↓
RISK SCORING
↓
INCIDENT CREATION
↓
ALERT / NOTIFICATION
↓
OPTIONAL HUMAN VERIFICATION
↓
RESPONSE / ESCALATION

Do not architect the application around a single AI vendor.

Create an abstraction layer:

AI Provider Interface

* detectObjects()
* trackObjects()
* analyzeFrame()
* classifyEvent()
* generateIncidentSummary()
* detectLicensePlate()
* calculateRisk()

This allows IRIS to change AI providers later without rewriting the application.

---

# 5. MULTI-TENANT ARCHITECTURE

IRIS must support:

Platform
→ Organizations
→ Locations
→ Cameras
→ Users
→ Roles
→ Events
→ Incidents
→ Rules
→ Notifications
→ Billing

Every organization must be isolated from every other organization.

A user belonging to Organization A must NEVER be able to access Organization B's:

* Cameras
* Video
* Events
* Incidents
* Users
* Billing
* Locations
* Reports

Implement tenant isolation at the database/API authorization layer, not merely in the UI.

---

# 6. USER ROLES

Create RBAC.

Roles:

### Platform Super Admin

IRIS internal administrator.

Can manage:

* All organizations
* Customers
* Locations
* Cameras
* Subscriptions
* AI configuration
* Monitoring operators
* System health
* Audit logs
* Platform configuration

### Organization Owner

Customer account owner.

Can:

* Manage organization
* Add locations
* Add users
* Manage cameras
* Configure AI rules
* View incidents
* Manage notifications
* View billing
* View reports

### Organization Admin

Similar to owner but without ownership/billing transfer capabilities.

### Security Manager

Can:

* View cameras
* View incidents
* Configure security rules
* Manage alerts
* View reports

### Viewer

Read-only access.

### Monitoring Operator

IRIS security operations staff.

Can:

* View assigned incidents
* Review AI-generated alerts
* View associated video clips
* Verify incidents
* Escalate incidents
* Add operator notes
* Close incidents

Every sensitive action must be recorded in the audit log.

---

# 7. AUTHENTICATION

Implement:

* Sign up
* Login
* Logout
* Password reset
* Session management
* Email verification architecture
* MFA-ready architecture
* Secure password hashing
* Rate limiting
* Account lockout/risk controls
* Device/session management

Never store plaintext passwords.

Use secure cookies/session handling.

---

# 8. MAIN CUSTOMER DASHBOARD

After login, the customer should immediately see:

## SECURITY STATUS

Large status indicator:

🟢 ALL SYSTEMS NORMAL

or

🟡 ATTENTION REQUIRED

or

🔴 ACTIVE SECURITY INCIDENT

Dashboard statistics:

* Cameras online
* Cameras offline
* Active incidents
* Incidents today
* AI events today
* Locations
* Critical events
* Last activity

Include:

### LIVE INCIDENT FEED

Example:

🔴
**Unauthorized person detected**

Rear Loading Area
Today — 2:14 AM

AI confidence: 96%

[VIEW INCIDENT]

---

### CAMERA HEALTH

16 cameras

15 Online

1 Offline

Clicking opens camera health.

---

### RECENT ACTIVITY

Timeline of meaningful events.

Do NOT flood the dashboard with meaningless motion events.

The product should prioritize actionable information.

---

# 9. LOCATIONS

Create a complete Locations module.

Customer can:

* Add location
* Edit location
* Archive location
* View location
* Add cameras
* View location security status

Location fields:

* Name
* Address
* Time zone
* Business hours
* Emergency contacts
* Security rules
* Camera count
* Status

Example:

### Boca Raton Dealership

Security Status:
🟢 Normal

18 Cameras

3 AI Events Today

0 Active Incidents

---

# 10. CAMERA MANAGEMENT

Create a comprehensive camera management system.

Camera fields:

* Name
* Location
* Manufacturer
* Model
* IP address
* Protocol
* Stream URL/reference
* Status
* Last heartbeat
* Resolution
* FPS
* Recording status
* AI enabled
* Created date

Support architecture for:

* RTSP
* ONVIF
* IP cameras
* NVR/DVR systems
* Future cloud camera APIs

DO NOT require customers to replace existing cameras by default.

IRIS should be designed around:

> **Bring Your Existing Cameras**

---

# 11. CAMERA ONBOARDING

Build an onboarding workflow:

## ADD CAMERA

Step 1:
Select location.

Step 2:
Choose:

* Discover cameras
* Add manually
* Connect NVR/DVR

Step 3:
Camera discovery.

Show:

**Camera Found**

Front Entrance

Manufacturer:
Example Camera

Protocol:
ONVIF

Status:
Available

Step 4:

Assign camera name.

Step 5:

Configure AI.

Step 6:

Save.

Make the architecture ready for actual ONVIF/RTSP discovery.

If actual discovery cannot run in the development environment, provide a clearly labeled simulated discovery mode.

---

# 12. LIVE CAMERA VIEW

Create professional live-view interface.

Features:

* Camera selector
* Location selector
* Grid view
* Single camera view
* Full screen
* Timestamp
* Connection status
* AI status
* Recording indicator
* Snapshot
* Incident creation
* Camera settings

Support layouts:

1 camera
4 cameras
9 cameras
16 cameras

Build responsive desktop/tablet/mobile behavior.

---

# 13. AI EVENT ENGINE

Create the core AI event architecture.

Events may include:

### Person

Person detected.

### Vehicle

Vehicle detected.

### Intrusion

Person/vehicle entered restricted zone.

### Line Crossing

Object crossed configured line.

### Loitering

Person remained in configured area beyond threshold.

### After Hours

Activity detected outside business hours.

### Object Removed

Potential removal of monitored object.

### Object Left

Potential abandoned object.

### Crowd

Unusual number of people.

### Camera Tampering

Camera appears obstructed/moved.

### Camera Offline

Camera stopped reporting.

### License Plate

License plate detected.

### Safety

Future support for:

* Falls
* PPE
* Fire/smoke
* Workplace hazards

### Suspicious Activity

Architecture for higher-level behavioral analysis.

---

# 14. AI EVENT DATA MODEL

Every event should contain:

* ID
* Organization ID
* Location ID
* Camera ID
* Event type
* Timestamp
* End timestamp
* Confidence score
* Risk score
* Object count
* Bounding boxes
* Tracking IDs
* Snapshot
* Video clip reference
* AI provider
* AI model/version
* Processing status
* Incident status
* Metadata

Do not store sensitive video indefinitely by default.

Build configurable retention policies.

---

# 15. ZONE BUILDER

This is a critical feature.

Allow customers to define areas on a camera:

### Example

Camera:
Rear Parking Lot

Zones:

**Restricted Area**

**Employee Area**

**Loading Area**

**Public Area**

**Vehicle Inventory**

Users should be able to draw:

* Rectangles
* Polygons
* Lines

Configure rules per zone.

Example:

Restricted Area:

☑ Person detection

☑ Vehicle detection

☑ After-hours

☑ Loitering

---

# 16. BUSINESS HOURS

Allow each location to define:

Monday–Friday:
8:00 AM–7:00 PM

Saturday:
9:00 AM–5:00 PM

Sunday:
Closed

Allow holiday exceptions.

AI rules can reference business hours.

Example:

Person detected during business hours:

LOW PRIORITY

Person detected at 2:00 AM:

HIGH PRIORITY

---

# 17. RISK ENGINE

Build a configurable risk scoring engine.

Example factors:

* Time of day
* Business open/closed
* Zone
* Event type
* Duration
* Number of people
* Number of vehicles
* Repeated events
* AI confidence
* Door/alarm correlation
* Historical pattern

Example:

Person + public zone + business open
= LOW

Person + restricted zone + business closed
= HIGH

Person + restricted zone + vehicle + door alarm
= CRITICAL

Make the scoring system configurable.

---

# 18. INCIDENT SYSTEM

An AI event does not automatically have to become an incident.

Create:

EVENT

and

INCIDENT

as separate concepts.

Many events can remain informational.

An incident represents something requiring attention.

Incident states:

* New
* AI Reviewing
* Awaiting Human Verification
* Verified
* False Positive
* Escalated
* Resolved
* Closed

---

# 19. INCIDENT SCREEN

Build a professional incident investigation interface.

Show:

## INCIDENT #IRIS-000123

**Unauthorized Person**

Rear Loading Area

2:14 AM

Risk:

🔴 HIGH

Timeline:

2:14:02 — Person detected

2:14:08 — Entered restricted zone

2:14:30 — Vehicle detected

2:15:10 — Person remains in zone

2:15:32 — Incident escalated

Include:

* Video clip
* Snapshot
* Camera
* Location
* AI reasoning
* Confidence
* Risk score
* Timeline
* Related events
* Operator notes
* Escalation history

Actions:

[VERIFY]

[FALSE POSITIVE]

[ESCALATE]

[RESOLVE]

[VIEW CAMERA]

---

# 20. AI INCIDENT SUMMARY

Create an AI summary service.

Example output:

> A person entered the restricted rear loading area at 2:14 AM while the business was closed. The individual remained in the area for approximately 3 minutes. A vehicle was detected nearby.

Do not allow the AI to claim facts that were not detected.

Every generated statement should be traceable to underlying events.

---

# 21. ALERT SYSTEM

Support:

* In-app alerts
* Email
* SMS architecture
* Push notification architecture
* Webhooks
* Future phone-call integration

Notification rules:

Example:

HIGH incident
→ SMS owner

CRITICAL incident
→ Monitoring operator

Camera offline
→ Email administrator

Low-risk event
→ dashboard only

Allow customers to configure notification preferences.

---

# 22. MONITORING OPERATOR CONSOLE

Create a completely separate interface for IRIS monitoring operators.

This will eventually support human verification.

Dashboard:

## MONITORING OPERATIONS

Active incidents:

🔴 7 Critical

🟠 14 High

🟡 32 Pending Review

Operators can claim incidents.

Queue:

Incident
Location
Risk
Age
Status
Assigned Operator

Build:

* Incident queue
* Claim incident
* Release incident
* Review video
* Verify
* False positive
* Escalate
* Add notes
* Close
* Operator activity logs

Design this like a real security operations center.

---

# 23. HUMAN VERIFICATION ARCHITECTURE

Do NOT assume IRIS itself will initially employ monitoring staff.

Create an abstraction:

Monitoring Provider

This allows IRIS to eventually integrate with:

* Internal monitoring team
* Third-party monitoring company
* Licensed central station
* Security partner

Create an interface:

verifyIncident()
escalateIncident()
notifyContact()
dispatchEmergencyResponse()

Do not actually contact emergency services in development.

Use simulated actions in development.

---

# 24. EMERGENCY ESCALATION

Build the software architecture for escalation but do not make unsupported claims about automatic police dispatch.

Potential workflow:

AI Event
↓
Risk Engine
↓
Human Verification
↓
Verified Incident
↓
Configured Escalation Procedure
↓
Customer / Monitoring Provider / Emergency Service

The system must clearly distinguish:

**AI detected**

from

**Human verified**

from

**Emergency response initiated**

---

# 25. CAMERA HEALTH

Create camera health monitoring.

Monitor:

* Online/offline
* Last heartbeat
* Stream health
* FPS
* Connection failures
* Storage
* AI processing
* Network status

If camera goes offline:

Create event:

### CAMERA OFFLINE

Camera:
Rear Parking Lot

Last seen:
11:42 PM

---

# 26. VIDEO STORAGE

Design storage abstraction.

Do not hard-code the application to local storage.

Create:

VideoStorageProvider

Methods:

uploadClip()
getClip()
deleteClip()
getSignedUrl()
applyRetentionPolicy()

Architecture should support object storage such as S3-compatible infrastructure.

Security:

* Encryption at rest
* Encryption in transit
* Signed URLs
* Short-lived access
* Tenant isolation
* Retention policies

---

# 27. SEARCH

Build intelligent security search.

Customer should eventually be able to search:

> "Show me people in the rear parking lot after midnight."

or:

> "Show vehicles entering the property yesterday."

or:

> "Show all incidents involving the loading dock this week."

Build the backend abstraction for natural-language video/event search.

Initially, search structured event metadata.

Do not pretend the system can semantically search raw video unless that capability is actually implemented.

---

# 28. REPORTING

Create:

### Security Reports

Daily
Weekly
Monthly

Metrics:

* Total AI events
* Incidents
* Critical incidents
* False positives
* Camera downtime
* Response times
* Most active cameras
* Most common event types
* After-hours events

Allow PDF/report generation architecture.

---

# 29. BILLING

Create SaaS billing architecture.

Plans:

### ESSENTIAL

$399/month

Up to 10 cameras.

### BUSINESS

$699/month

More cameras/features.

### PRO

$1,499/month

Advanced monitoring.

### ENTERPRISE

Custom pricing.

IMPORTANT:

These are initial product/package concepts, not claims about final pricing.

Build:

* Subscription
* Plan
* Usage
* Camera count
* Billing status
* Invoices
* Payment method architecture
* Upgrade
* Downgrade
* Cancel
* Trial architecture

Use Stripe integration architecture.

If Stripe credentials are unavailable, implement development mode.

---

# 30. PLATFORM ADMIN

Build internal IRIS admin dashboard.

Sections:

* Organizations
* Users
* Locations
* Cameras
* Incidents
* AI events
* Monitoring
* Billing
* Subscriptions
* System health
* AI providers
* Integrations
* Audit logs

---

# 31. AUDIT LOG

Log security-sensitive actions.

Examples:

USER_LOGIN

CAMERA_ADDED

CAMERA_REMOVED

RULE_CHANGED

INCIDENT_VIEWED

INCIDENT_VERIFIED

INCIDENT_ESCALATED

INCIDENT_CLOSED

USER_CREATED

USER_ROLE_CHANGED

BILLING_CHANGED

Each audit entry:

* User
* Organization
* Action
* Timestamp
* IP metadata where legally appropriate
* Resource
* Previous state
* New state

---

# 32. SECURITY

Treat security as a first-class feature.

Implement:

* Input validation
* Authorization
* Tenant isolation
* Rate limiting
* CSRF protection where applicable
* Secure cookies
* Password hashing
* Secrets via environment variables
* No credentials committed to Git
* Secure API design
* Signed video URLs
* Least-privilege access
* Audit logs

Create a SECURITY.md file.

Never place API keys, passwords, camera credentials, Stripe secrets, or other secrets in source control.

---

# 33. PRIVACY

Build privacy controls into the architecture.

Support:

* Configurable video retention
* Event retention
* User data deletion
* Organization deletion workflow
* Access logging
* Data export architecture
* Privacy settings
* Camera-level privacy configuration

Do not unnecessarily collect personal information.

Do not expose camera feeds publicly.

---

# 34. DEVELOPMENT SIMULATOR

Create a powerful development simulator.

This is important because the actual camera/AI infrastructure may not exist during initial development.

Simulator should be able to generate:

* Person detected
* Vehicle detected
* Intrusion
* Loitering
* After-hours activity
* Camera offline
* Object removed
* License plate detected
* Critical incident

The simulator must clearly identify data as:

**DEVELOPMENT / SIMULATED**

Never represent simulated events as actual customer security events.

---

# 35. REAL-TIME ARCHITECTURE

Use real-time updates where appropriate.

When a new incident occurs:

Customer dashboard updates without refreshing.

Monitoring console updates.

Notifications trigger.

Camera status updates.

Use WebSockets, SSE, or another appropriate technology.

---

# 36. MOBILE RESPONSIVENESS

The customer application must be fully responsive.

Prioritize:

* iPhone
* Android
* Tablet
* Desktop

Mobile users should be able to:

* View security status
* View cameras
* View incidents
* Watch clips
* Acknowledge alerts
* Review incidents
* View locations

The mobile experience should not simply be a shrunk desktop interface.

---

# 37. DESIGN SYSTEM

Create reusable components:

* Buttons
* Cards
* Tables
* Status badges
* Alerts
* Modals
* Drawers
* Charts
* Camera tiles
* Incident cards
* Timeline
* Navigation
* Forms
* Empty states
* Skeleton loaders
* Error states

Use consistent typography, spacing, icons, and interaction patterns.

---

# 38. LANDING PAGE

Create a premium public marketing website.

Hero:

# IRIS

### Intelligent Security. Continuous Awareness.

Supporting copy:

> Turn your existing security cameras into an intelligent 24/7 security system.

CTA:

**Get Started**

Secondary:

**See How IRIS Works**

Sections:

### Your Cameras. Now Intelligent.

Explain that IRIS can be designed around existing camera infrastructure.

### AI That Watches What Matters

Explain event detection and prioritization.

### Know When Something Happens

Show incident examples.

### Built for Business

Target:

* Auto dealerships
* Warehouses
* Construction
* Retail
* Restaurants
* Offices
* Multi-location businesses

### Security Without the Noise

Emphasize meaningful alerts instead of endless motion notifications.

---

# 39. DEMO MODE

Create an interactive demo.

Visitor can select:

Dealership
Warehouse
Restaurant
Construction Site

Show simulated cameras.

Allow visitor to trigger:

Person entering restricted area.

Then show IRIS processing:

DETECTED

↓

ANALYZING

↓

RISK ASSESSMENT

↓

INCIDENT CREATED

↓

ALERT

This should be one of the most impressive parts of the website.

---

# 40. DATABASE

Create normalized database models for at minimum:

User

Organization

Membership

Role

Location

Camera

CameraCredential

CameraHealth

AIProvider

AIModel

AIEvent

DetectedObject

Zone

Rule

Incident

IncidentEvent

IncidentNote

IncidentAssignment

Escalation

Notification

NotificationPreference

Subscription

Plan

Invoice

AuditLog

VideoAsset

StoragePolicy

MonitoringProvider

MonitoringOperator

OperatorAssignment

Integration

Webhook

Session

Use appropriate indexes.

Pay particular attention to:

organization_id

location_id

camera_id

timestamp

event_type

risk_score

incident_status

---

# 41. API ARCHITECTURE

Create clean API boundaries.

Examples:

/api/auth

/api/organizations

/api/locations

/api/cameras

/api/camera-health

/api/events

/api/incidents

/api/zones

/api/rules

/api/notifications

/api/monitoring

/api/reports

/api/billing

/api/admin

/api/integrations

Use consistent:

* Authentication
* Authorization
* Validation
* Error responses
* Pagination
* Filtering
* Sorting

---

# 42. AI PROVIDER ABSTRACTION

Do not tightly couple IRIS to one model.

Create:

AIProvider

Implement initially:

MockAIProvider

Then structure the application so actual providers can be added later.

Potential categories:

* Object detection
* Computer vision
* OCR
* LPR
* Video understanding
* LLM-based event summaries

The provider interface should allow us to replace models without changing the application.

---

# 43. CAMERA PROVIDER ABSTRACTION

Create:

CameraProvider

Support architecture for:

RTSPProvider

ONVIFProvider

NVRProvider

CloudCameraProvider

MockCameraProvider

This is critical.

---

# 44. OBSERVABILITY

Create system health monitoring.

Track:

* API latency
* AI processing latency
* Camera connection health
* Queue health
* Notification failures
* Storage failures
* Database health

Create an internal system health dashboard.

---

# 45. ERROR HANDLING

Never leave the user with a blank screen.

Implement:

* Error boundaries
* Toasts
* Retry actions
* Loading states
* Empty states
* Offline states
* Connection failure states

---

# 46. TESTING

Create automated tests.

At minimum:

### Unit tests

Risk engine

Permissions

Event classification

Rules

Billing calculations

Retention logic

### Integration tests

Authentication

Tenant isolation

Camera creation

Incident creation

Notifications

### End-to-end tests

Login

Create organization

Add location

Add camera

Create zone

Create rule

Generate simulated AI event

Create incident

Review incident

Resolve incident

---

# 47. SEED DATA

Create realistic development data.

Organizations:

IRIS Demo Security

Locations:

Boca Raton Dealership

Warehouse

Restaurant

Construction Site

Cameras:

Front Entrance

Parking Lot

Rear Loading Area

Service Bay

Cash Office

Employee Entrance

Generate realistic simulated events.

---

# 48. DOCUMENTATION

Create:

README.md

ARCHITECTURE.md

SECURITY.md

API.md

DATABASE.md

AI.md

CAMERA_INTEGRATION.md

DEPLOYMENT.md

MONITORING.md

BILLING.md

CONTRIBUTING.md

ENVIRONMENT.md

Explain:

* How to run locally
* Environment variables
* Database setup
* Migrations
* Seed data
* Tests
* Deployment
* AI providers
* Camera providers
* Security architecture

---

# 49. ENVIRONMENT VARIABLES

Create a complete `.env.example`.

Never commit `.env`.

Include placeholders for:

DATABASE_URL

AUTH_SECRET

AI_PROVIDER_KEY

STORAGE_ACCESS_KEY

STORAGE_SECRET

STORAGE_BUCKET

STRIPE_SECRET_KEY

STRIPE_WEBHOOK_SECRET

EMAIL_PROVIDER_KEY

SMS_PROVIDER_KEY

etc.

---

# 50. GIT REQUIREMENT — CRITICAL

At the beginning of development:

Check Git status.

If Git is not initialized:

Initialize Git.

Create an appropriate `.gitignore`.

Make sure secrets and environment files are ignored.

Throughout development, create logical commits.

Use meaningful commit messages such as:

feat: initialize IRIS platform

feat: add multi-tenant authentication

feat: add organization management

feat: add camera management

feat: add AI event engine

feat: add incident management

feat: add monitoring console

feat: add billing architecture

fix: enforce tenant isolation

etc.

## VERY IMPORTANT:

When the implementation is complete, **PUSH EVERYTHING TO GIT.**

Inspect the repository's existing Git configuration first.

If a remote repository already exists:

* Verify the remote.
* Commit all intended changes.
* Push the completed implementation to the appropriate branch.

If no remote exists:

* Do NOT invent credentials.
* Do NOT expose secrets.
* Prepare the repository for remote Git hosting.
* Tell me exactly what remote URL needs to be configured.

Before pushing:

Run:

* Tests
* Type checking
* Linting
* Build
* Security checks where available

Then:

1. Check `git status`
2. Review changed files
3. Confirm no secrets are present
4. Commit everything necessary
5. Push to the configured remote
6. Verify the push
7. Report the commit hash and branch

DO NOT leave the project in an uncommitted state unless technically impossible.

---

# 51. DEVELOPMENT PHILOSOPHY

Do not over-engineer meaningless things.

Prioritize:

1. Security
2. Tenant isolation
3. Camera architecture
4. AI event architecture
5. Incident management
6. Monitoring
7. Customer experience
8. Reliability
9. Scalability
10. Visual polish

The MVP must feel like a legitimate commercial product.

---

# 52. DO NOT FAKE CAPABILITIES

This is extremely important.

Never tell the user:

"AI detected a weapon"

unless the underlying AI actually detected/classified a weapon.

Never tell the user:

"Police have been notified"

unless an actual authorized integration performed that action.

Never tell the user:

"Camera is recording"

unless the system knows that it is.

Never fabricate:

* AI confidence
* Camera status
* Emergency response
* Human verification
* Monitoring operator activity
* Video analysis

Development simulations must be clearly marked.

---

# 53. FUTURE ARCHITECTURE

Design the system so future versions can support:

* Edge AI gateway
* On-premise processing
* GPU acceleration
* Multi-camera tracking
* Facial recognition only if legally and commercially appropriate
* License plate recognition
* Audio analytics
* Two-way audio
* Alarm integrations
* Access control
* Door sensors
* Gate systems
* IoT sensors
* Fire/smoke detection
* Wearable safety devices
* Mobile patrol integration
* Human monitoring
* Central station integration
* Enterprise SSO
* SOC 2-oriented controls
* Advanced analytics
* AI natural-language video search

Do not implement all of these now.

Create clean extension points.

---

# 54. IMPORTANT LEGAL/COMPLIANCE ARCHITECTURE

IRIS is software.

Do not make unsupported claims that IRIS itself is a licensed security agency, central monitoring station, alarm company, or emergency dispatch provider.

Build configuration and integration points that allow IRIS to work with appropriately licensed monitoring/security partners.

Clearly distinguish:

AI detection

Human verification

Customer notification

Monitoring-provider action

Emergency response

The architecture should allow legal/compliance requirements to be incorporated later without rewriting the core product.

---

# 55. FINAL UX REQUIREMENT

The customer should be able to log in and understand the security status of their entire business in approximately **5 seconds**.

The most important question the interface answers is:

> **"Is something happening that I need to know about?"**

Everything else is secondary.

Avoid clutter.

Prioritize clarity.

---

# 56. FINAL ACCEPTANCE TEST

Before declaring the project complete, demonstrate this complete workflow:

1. Create customer organization.
2. Create location.
3. Add simulated cameras.
4. Configure business hours.
5. Draw restricted zone.
6. Configure after-hours person rule.
7. Generate simulated person event.
8. AI event enters processing pipeline.
9. Risk engine evaluates event.
10. Incident is created.
11. Dashboard updates in real time.
12. Notification is generated.
13. Monitoring console receives incident.
14. Operator claims incident.
15. Operator reviews simulated video.
16. Operator verifies incident.
17. Incident is escalated in development mode.
18. Incident is resolved.
19. Audit log records every action.
20. Customer sees incident history.
21. Reporting reflects the incident.
22. Camera health remains visible.
23. Tenant isolation is verified.
24. Tests pass.
25. Production build passes.

---

# 57. BUILD ORDER

Implement in this approximate order:

PHASE 1
Foundation

* Repository
* Architecture
* Database
* Authentication
* RBAC
* Tenant isolation

PHASE 2
Customer management

* Organizations
* Locations
* Users

PHASE 3
Camera infrastructure

* Cameras
* Camera providers
* Camera health
* Live-view architecture

PHASE 4
AI

* AI provider abstraction
* Event engine
* Object detection architecture
* Rules
* Zones
* Risk scoring

PHASE 5
Incidents

* Incident engine
* Timeline
* Video assets
* AI summaries
* Notifications

PHASE 6
Monitoring

* Operator console
* Assignment
* Verification
* Escalation architecture

PHASE 7
Business

* Billing
* Plans
* Subscriptions
* Reports

PHASE 8
Polish

* Landing page
* Demo mode
* Responsive UX
* Animations
* Empty/loading/error states

PHASE 9
Testing/security

* Unit
* Integration
* E2E
* Tenant isolation
* Security review

PHASE 10
Git

* Review
* Test
* Commit
* Push
* Verify

---

# 58. IMPORTANT — DO NOT STOP AFTER CREATING MOCKUPS

The UI is important, but this is a SOFTWARE BUILD.

Do not stop after creating attractive screens.

Every screen should connect to the appropriate application state/API/database where practical.

If a third-party integration cannot yet be connected, implement the interface and development simulator so the workflow can still be tested end-to-end.

---

# 59. START NOW

Begin by inspecting the repository.

Then provide a concise implementation plan.

Then begin building.

Do not ask unnecessary questions.

Make reasonable engineering decisions and document them.

After each major phase, verify that the application still builds.

At completion:

* Run tests
* Run lint
* Run type checks
* Run production build
* Inspect Git diff
* Check for secrets
* Commit changes
* Push everything to Git
* Verify the remote branch
* Provide a concise completion report containing:

  * What was built
  * What is functional
  * What is simulated
  * Remaining integrations
  * Test results
  * Git branch
  * Git commit hash
  * Push status

**Build IRIS as if this is the foundation of a real commercial AI security company, not a prototype that will be thrown away.**

---

# STRATEGIC NOTES

This gives a much stronger foundation than simply cloning ImageDeep/Spot AI. The important part is that IRIS owns the architecture and can eventually swap AI providers, camera providers, and monitoring providers without rebuilding the entire product.

Next major build after the SaaS dashboard: the **AI gateway / edge-processing component**. That is what eventually lets IRIS ingest customers' existing RTSP/ONVIF cameras and process video locally rather than sending every camera stream to the cloud.
