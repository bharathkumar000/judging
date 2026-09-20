# Features by Portal

## 🏛️ ADMIN PORTAL (`/admin/dashboard`)

| Feature | Status |
|---------|--------|
| Telemetry Dashboard | ✅ 4 stat cards (teams, judges, evaluations, completion %) |
| Master Evaluation Matrix | ✅ Real-time cross-tab: teams × judges with scores |
| Live Visibility Controls | ✅ Toggle: live scores, leaderboard, results lock |
| Scoring Formula Display | ✅ Shows current method (average/weighted/sum) |
| CSV Export | ✅ Master scorecard with per-judge breakdown |
| Rubric Builder Link | ✅ Navigates to `/admin/rubrics` (redirect stub) |
| Team Click-through | ✅ Shows "view" link but no modal |

### Admin Stub Pages (redirect to dashboard)
- `/admin/teams` → redirect
- `/admin/judges` → redirect
- `/admin/assignments` → redirect
- `/admin/rubrics` → redirect
- `/admin/evaluations` → redirect
- `/admin/submissions` → redirect
- `/admin/settings` → redirect
- `/admin/announcements` → redirect
- `/admin/audit` → redirect
- `/admin/schedule` → redirect

---

## ⚖️ JUDGE PORTAL

| Page | Features |
|------|----------|
| `/judge/dashboard` | ✅ Assigned teams grid, filter tabs (All/Pending/Completed/Draft), search, status badges, project title preview, assigned score display, "Score This Team"/"Revise Scorecard" actions |
| `/judge/evaluate/[id]` | ✅ Full evaluation workspace: left panel (team dossier: problem, solution, tech stack, links), right panel (criteria sliders 0-25, number inputs, quick presets, criterion comments, overall feedback textarea, live total, save draft / submit final) |
| `/judge/history` | ❌ Redirect stub |

---

## 👥 TEAM PORTAL

| Page | Features |
|------|----------|
| `/team/dashboard` | ✅ Rank & aggregate score cards, project dossier (title, problem, solution, links), judge feedback list with criteria breakdown (if enabled) |
| `/team/score` | ❌ Redirect to dashboard |
| `/team/profile` | ❌ Redirect to dashboard |
| `/team/submission` | ❌ Redirect to dashboard |
| `/team/notifications` | ❌ Redirect to dashboard |

---

## 🎯 COORDINATOR PORTAL (`/coordinator/dashboard`)

| Feature | Status |
|---------|--------|
| Pitch Timer | ✅ 5-min countdown, start/pause/reset, 3-min Q&A quick-set |
| Room Filter | ✅ Dropdown by room |
| Search | ✅ By team name/code |
| Presentation Queue Table | ✅ Slot, room, team/members, track, check-in toggle, pitch status (Pending/Presenting/Done), judge scorecards per judge |
| Real-time toggles | ✅ Check-in, pitch status, live judge completion badges |

---

## 🌐 PUBLIC / SHARED PAGES

| Page | Features |
|------|----------|
| `/` (Landing) | ✅ Role launchpad (4 quick-login cards), event telemetry, rubric preview, pitch schedule preview |
| `/login` | ✅ 4 role quick-login, custom identifier form, passcode field |
| `/leaderboard` | ✅ Podium (top 3), search, track filter, expandable rubric breakdown per team, masked mode when disabled |
| `/missions` | ✅ Track cards with team counts, descriptions, link to leaderboard filtered by track |
| `/schedule` | ✅ Timeline phases with status (active/completed/upcoming), time slots |
| `/rules` | ✅ Active rubric criteria grid (max points + descriptions), pitch rules (5min/3min/100% originality) |

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