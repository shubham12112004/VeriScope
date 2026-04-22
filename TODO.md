# Task: Make App Run & Fix Everything

## Current Status
- [x] Identified files: register.tsx (weak pwd error), login.tsx, contact.tsx (placeholder)
- [ ] npm install (interrupted)
- [ ] Dev server running

## Plan
1. **Fix Password Weak Error** ✅
   - Updated register client validation (regex for complexity)
   - Prevents Supabase weak pwd error

2. **Add Forgot Password** ✅
   - Added link in login.tsx
   - Created src/routes/forgot-password.tsx with Supabase reset

3. **Contact Form** ⏳
   - Add EmailJS for raoshubham192@gmail.com

4. **Button Tests** ⏳
   - Test all after fixes

5. **MongoDB** ⏳
   - Pending cluster link

6. **Supabase Config** ⏳
   - Verify client.ts env vars

## Next Steps
- Resume npm install
- Fix register validation
- Add forgot password
