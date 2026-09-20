# Features by Portal

## 🏛️ ADMIN PORTAL (`/admin/*`)
**Clearance: Tier 3 (Root Command)** — Full CRUD over everything

| Page | Features | Authorities |
|------|----------|-------------|
| `/admin/dashboard` | ✅ Telemetry Dashboard (4 stat cards: teams, judges, evaluations, completion %), Master Evaluation Matrix (real-time cross-tab: teams × judges with scores), Live Visibility Controls (toggle: live scores, leaderboard, results lock), Scoring Formula Display (shows current method: average/weighted/sum), CSV Export (master scorecard with per-judge breakdown), Rubric Builder Link (navigates to `/admin/rubrics`), Team Click-through (shows "view" link, no modal) | View all teams/judges/evaluations; toggle `SHOW_LIVE_SCORE`, `SHOW_RUBRIC_BREAKDOWN`, `SHOW_JUDGE_IDENTITY`, `SHOW_RANK`, `SHOW_LEADERBOARD`, `ANONYMOUS_JUDGING`, `SUBMISSIONS_LOCKED`, `RESULTS_LOCKED` |
| `/admin/teams` | ↪️ Redirect stub (to dashboard) | **Planned:** Full CRUD — create/edit/disqualify/activate teams, change track assignments |
| `/admin/judges` | ↪️ Redirect stub | **Planned:** Add/remove judges, monitor workload pacing, toggle review privileges |
| `/admin/assignments` | ↪️ Redirect stub | **Planned:** Drag-drop judge↔team matrix, 1-click batch auto-distribution |
| `/admin/rubrics` | ↪️ Redirect stub | **Planned:** Visual criteria editor — add/remove/reorder, weights, max marks, calculation method (Simple Average, Weighted Average, Sum) |
| `/admin/evaluations` | ↪️ Redirect stub | **Planned:** Cross-judge score matrix, outlier divergence warnings (Δ > 12 pts) |
| `/admin/submissions` | ↪️ Redirect stub | **Planned:** Inspect code repositories, lock/unlock individual squad submissions |
| `/admin/settings` | ↪️ Redirect stub | **Planned:** Granular visibility toggles, event config persistence to Supabase/localStorage |
| `/admin/announcements` | ↪️ Redirect stub | **Planned:** Create/priority/schedule real-time broadcasts to all connected clients |
| `/admin/audit` | ↪️ Redirect stub | **Planned:** Immutable chronological log of administrative and scoring actions |
| `/admin/schedule` | ↪️ Redirect stub | **Planned:** CRUD phases, drag-reorder, date/time picker |

---

## ⚖️ JUDGE PORTAL (`/judge/*`)
**Clearance: Tier 2 (Syndicate)** — Assigned teams only

| Page | Features | Authorities |
|------|----------|-------------|
| `/judge/dashboard` | ✅ Assigned teams grid, filter tabs (All/Pending/Completed/Draft), search, status badges, project title preview, assigned score display, "Score This Team"/"Revise Scorecard" actions | View **only assigned teams**; filter by status; see assigned score |
| `/judge/evaluate/[id]` | ✅ Full evaluation workspace: left panel (team dossier: problem, solution, tech stack, links to GitHub, demo, pitch deck), right panel (criteria sliders 0-25, number inputs, quick presets, criterion comments, overall feedback textarea, live total, save draft / submit final) | Edit scores **only for assigned team**; save drafts; lock & submit final; cannot see other judges' scores if `ANONYMOUS_JUDGING=true` |
| `/judge/history` | ❌ Redirect stub | **Planned:** View past scoring records with optional score revision before judging deadline |

---

## 👥 TEAM PORTAL (`/team/*`)
**Clearance: Tier 1 (Operative)** — Own team only

| Page | Features | Authorities |
|------|----------|-------------|
| `/team/dashboard` | ✅ Rank & aggregate score cards, project dossier (title, problem, solution, links), judge feedback list with criteria breakdown (if enabled) | View **own** rank, score, feedback; see rubric breakdown only if `SHOW_RUBRIC_BREAKDOWN=true` |
| `/team/score` | ❌ Redirect to dashboard | **Planned:** Live score distribution across all rubric criteria with animated updates, qualitative judge feedback |
| `/team/profile` | ❌ Redirect to dashboard | **Planned:** Edit team name, members, avatar |
| `/team/submission` | ❌ Redirect to dashboard | **Planned:** Rich editor for problem/solution, file uploads, link validation, GitHub/demo/deck URLs |
| `/team/notifications` | ❌ Redirect to dashboard | **Planned:** Real-time alerts (eval received, announcements) with urgency levels (INFO, WARNING, URGENT) |

---

## 🎯 COORDINATOR PORTAL (`/coordinator/dashboard`)
**Clearance: Tier 3 (Root Command)** — Event operations

| Feature | Status | Authorities |
|---------|--------|-------------|
| Pitch Timer | ✅ 5-min countdown, start/pause/reset, 3-min Q&A quick-set | Control presentation timing |
| Room Filter | ✅ Dropdown by room | Filter queue by room |
| Search | ✅ By team name/code | Find teams in queue |
| Presentation Queue Table | ✅ Slot, room, team/members, track, check-in toggle, pitch status (Pending/Presenting/Done), judge scorecards per judge | Toggle check-in, pitch status; see judge completion badges |
| Real-time toggles | ✅ Check-in, pitch status, live judge completion badges | Manage live presentation flow |

---

## 🌐 PUBLIC / SHARED PAGES
**Clearance: None (Public)** — Visible to all

| Page | Features | Visibility Controls |
|------|----------|---------------------|
| `/` (Landing) | ✅ Role launchpad (4 quick-login cards), event telemetry, rubric preview, pitch schedule preview | Always public |
| `/login` | ✅ 4 role quick-login, custom identifier form, passcode field | Always public |
| `/leaderboard` | ✅ Podium (top 3), search, track filter, expandable rubric breakdown per team, masked mode when disabled | Masked if `SHOW_LEADERBOARD=false` or `SHOW_RANK=false` |
| `/missions` | ✅ Track cards with team counts, descriptions, link to leaderboard filtered by track | Always public |
| `/schedule` | ✅ Timeline phases with status (active/completed/upcoming), time slots | Always public |
| `/rules` | ✅ Active rubric criteria grid (max points + descriptions), pitch rules (5min/3min/100% originality) | Shows criteria only if `SHOW_RUBRIC_BREAKDOWN=true` |

---

## 🔐 RBAC Summary Matrix

| Action | Admin (Tier 3) | Judge (Tier 2) | Team (Tier 1) | Public |
|--------|---------------|----------------|---------------|--------|
| View all teams | ✅ | ❌ (assigned only) | ❌ (own only) | ❌ |
| View all judges | ✅ | ❌ | ❌ | ❌ |
| Edit team info | ✅ | ❌ | ✅ (own, via profile) | ❌ |
| Edit judge info | ✅ | ❌ | ❌ | ❌ |
| Assign judges ↔ teams | ✅ | ❌ | ❌ | ❌ |
| Edit rubric | ✅ | ❌ | ❌ | ❌ (view only if enabled) |
| Score teams | ❌ | ✅ (assigned only) | ❌ | ❌ |
| View other judges' scores | ✅ | ❌ (if anonymous) | ❌ | ❌ |
| Submit project | ❌ | ❌ | ✅ (own) | ❌ |
| View own feedback | ❌ | ❌ | ✅ (if enabled) | ❌ |
| Toggle visibility settings | ✅ | ❌ | ❌ | ❌ |
| Broadcast announcements | ✅ | ❌ | ❌ | ❌ |
| Manage presentation queue | ✅ | ❌ | ❌ | ❌ |
| View leaderboard | ✅ | ✅ | ✅ | ✅ (masked) |
| View rubric breakdown | ✅ | ✅ | ✅ (if enabled) | ✅ (if enabled) |

---

## 📋 PRIORITIZED ROADMAP

### HIGH IMPACT - Core Missing Features

| Feature | Portal | Effort | Value |
|---------|--------|--------|-------|
| Team CRUD | Admin | Medium | Full team lifecycle management |
| Judge CRUD | Admin | Medium | Add/edit/remove judges, specializations |
| Assignment Matrix UI | Admin | Medium | Drag-drop judge↔team assignments, auto-assign algorithm |
| Rubric Builder | Admin | High | Visual criteria editor: add/remove/reorder, weights, max marks |
| Submission Review | Admin | Medium | Approve/reject/lock submissions, view all links |
| Announcement Broadcast | Admin | Low | Create/priority/schedule announcements |
| Audit Log Viewer | Admin | Low | Filterable action history |
| Schedule Manager | Admin | Medium | CRUD phases, drag-reorder, date/time picker |
| Settings Persistence | Admin | Low | Save event config to Supabase/localStorage |

### JUDGE ENHANCEMENTS

| Feature | Effort | Value |
|---------|--------|-------|
| Evaluation History | Low | View past scores, compare revisions |
| Bulk Draft Save | Low | Save all drafts at once |
| Keyboard Shortcuts | Low | Arrow keys for sliders, Enter to submit |
| Offline Draft Support | Medium | IndexedDB sync when online |
| Score Calibration View | Medium | See other judges' scores (if anonymous_judging=false) |

### TEAM ENHANCEMENTS

| Feature | Effort | Value |
|---------|--------|-------|
| Submission Form | High | Rich editor for problem/solution, file uploads, link validation |
| Profile Management | Low | Edit team name, members, avatar |
| Notification Center | Low | Real-time alerts for eval received, announcements |
| Pitch Slot Countdown | Low | Personal timer to presentation |
| Feedback Export | Low | PDF of all judge feedback |

### COORDINATOR ENHANCEMENTS

| Feature | Effort | Value |
|---------|--------|-------|
| Bulk Check-in | Low | Check-in all teams in room |
| Print Queue | Low | Printable schedule for door |
| Judge Nudge | Medium | Send "please evaluate" push to judges |
| Room Analytics | Medium | Completion rate per room |

### PLATFORM-WIDE

| Feature | Effort | Value |
|---------|--------|-------|
| Supabase Auth Integration | High | Real auth, JWT, RLS policies |
| Realtime Sync | High | Live updates across all portals via Supabase Realtime |
| Email Notifications | Medium | SMTP for eval reminders, announcements |
| Dark/Light Theme Toggle | Low | User preference |
| Accessibility Audit | Medium | WCAG 2.1 AA compliance |
| E2E Tests (Playwright) | Medium | Critical paths: login→eval→leaderboard |
| API Rate Limiting | Low | Protect endpoints |
| Docker/Deploy Config | Low | Production-ready containerization |

### DATA & ANALYTICS

| Feature | Effort | Value |
|---------|--------|-------|
| Judge Agreement Metrics | Medium | Inter-rater reliability (Cohen's κ) |
| Score Distribution Charts | Medium | Histograms, box plots per criterion |
| Team Progress Tracking | Low | Submission → eval → final score funnel |
| Export All Data | Low | Full JSON/CSV backup |

---

## ✅ QUICK WINS (1-2 days each)

1. Implement the 10 Admin stub pages
2. Build Team Submission form (`/team/submission`)
3. Add Team Notifications center
4. Build Judge History page
5. Add print stylesheet for Coordinator queue
6. Persist eventSettings to localStorage/Supabase
7. Add loading skeletons & error boundaries
8. Toast notifications for all mutating actions