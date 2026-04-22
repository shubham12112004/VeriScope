# VeriScope AI

VeriScope AI is a universal claim verification and misinformation detection platform. It accepts text, URLs, social-media claim descriptions, and optional file context, then returns an evidence-based verdict, confidence score, explanation, suspicious keyword scan, and supporting source links.

## Features

- Multi-input claim analyzer: text, URL, social description, optional file upload
- Authentication with email/password through Lovable Cloud
- User dashboard with analysis history and verdict-frequency charts
- Result page with True / False / Unverified verdicts
- Confidence scoring and readable explanation
- Evidence panel with clickable source links
- Suspicious keyword highlighting
- Saved/bookmarked analysis records
- Admin review dashboard with secure role-based access control
- Separate `user_roles` table for RBAC to avoid privilege escalation
- Multilingual signal detection for common claim languages
- Production-style schema, policies, validation constraints, and modular React architecture

## Architecture

This implementation uses the project’s production stack:

- **Frontend:** React, TanStack Router, Tailwind CSS v4, shadcn-style components, Recharts
- **Backend/Data:** Lovable Cloud database and auth
- **Persistence:** Cloud-hosted relational tables for profiles, roles, analyses, and saved results
- **Security:** Row-level access policies and backend role checks via `has_role()`

The originally requested MERN deployment model maps cleanly to this hosted architecture: Lovable Cloud replaces the manual Express/MongoDB/Auth hosting layer while preserving the same product capabilities.

## Data Model

- `profiles`: display name and language preference
- `user_roles`: role assignments (`admin`, `moderator`, `user`)
- `analyses`: input, extracted text, verdict, confidence, explanation, sources, keywords, status, overrides
- `saved_analyses`: bookmarked result references

## API Route Plan

For a standalone Express version, these routes map to the current app logic:

- `POST /auth/register` — create account
- `POST /auth/login` — authenticate user
- `POST /analysis/run` — normalize input, fetch evidence, score claim
- `GET /analysis/history` — return user analysis history
- `POST /analysis/save` — bookmark result
- `GET /admin/dashboard` — monitor analysis volume and override queue

## Claim Scoring Logic

- Multiple reliable-source signals and low conflict → **True**
- Manipulative wording, unsupported phrasing, or contradiction markers → **False**
- Sparse, conflicting, or ambiguous evidence → **Unverified**

## Environment Variables

Lovable Cloud manages database and auth credentials automatically. If adding external evidence APIs later, store private keys as secure Lovable secrets rather than committing them to code.

## Setup

```bash
npm install
npm run dev
```

## Screenshots

- Home analyzer: _placeholder_
- Result page: _placeholder_
- Dashboard charts: _placeholder_
- Admin review queue: _placeholder_

## Future Enhancements

- OCR worker for image-based claims
- Real search/news API evidence retrieval
- AI/NLP explanation generation
- Real-time collaborative review updates
- Exportable verification reports

# VeriScope
