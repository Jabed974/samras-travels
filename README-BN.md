# সামরাস ট্রাভেলস এন্ড ট্যুরস — অনলাইন স্টার্টার

এটি **প্রাথমিক deployable starter**, চূড়ান্ত পূর্ণাঙ্গ সফটওয়্যার নয়। বর্তমানে লগইন, শেয়ারড Supabase ডেটাবেসে টিকিট রেকর্ড যোগ/দেখা এবং প্রাথমিক RLS-ভিত্তিক role schema আছে। ক্লায়েন্ট, ভেন্ডর, লেনদেন, ভিসা/হজ/ওমরাহ ও অডিট লগের টেবিল তৈরি হয়; এগুলোর পূর্ণ UI পরবর্তী ধাপে বানাতে হবে।

## ১) Supabase ডেটাবেস
1. https://supabase.com-এ নতুন project তৈরি করুন।
2. SQL Editor-এ `supabase/schema.sql`-এর সব SQL রান করুন।
3. Authentication → Users → Add user দিয়ে নিজের ইমেইল ও শক্ত পাসওয়ার্ডে প্রথম user তৈরি করুন।
4. user-এর UUID কপি করে SQL Editor-এ চালান (UUID ও নাম বদলাবেন):
```sql
insert into public.profiles(id,full_name,role,active)
values('PASTE-USER-UUID','Office Owner','owner',true)
on conflict(id) do update set role='owner',active=true;
```
5. অন্য কর্মচারীর Auth user তৈরি করে তার UUID দিয়ে profiles-এ role দিন: owner/admin/manager/accountant/staff। Public sign-up বন্ধ রাখুন।

## ২) Vercel-এ অনলাইন প্রকাশ
1. GitHub-এ private repository বানিয়ে এই project-এর ফাইলগুলো আপলোড করুন।
2. https://vercel.com-এ repository import করে deploy করুন।
3. Environment Variables-এ দিন:
   - `NEXT_PUBLIC_SUPABASE_URL` = Supabase Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = Supabase anon/publishable key
4. Deploy হলে Vercel test URL দেবে। পরে চাইলে নিজের domain যুক্ত করতে পারবেন; শুরুতে domain কেনা বাধ্যতামূলক নয়।

## ৩) নিজের কম্পিউটারে চালানো
Node.js LTS ইনস্টল করে:
```bash
npm install
cp .env.example .env.local
# .env.local-এ Supabase URL এবং anon key বসান
npm run dev
```
তারপর http://localhost:3000 খুলুন।

## নিরাপত্তা ও সীমাবদ্ধতা
- কখনো `service_role` বা secret key browser/GitHub-এ দেবেন না; শুধু anon/publishable key ব্যবহার করুন।
- আলাদা কর্মচারী লগইন দিন, public sign-up বন্ধ রাখুন এবং শক্ত পাসওয়ার্ড ব্যবহার করুন।
- RLS নীতি প্রাথমিক; live data ব্যবহারের আগে security review ও role-by-role পরীক্ষা আবশ্যক।
- পাসপোর্ট তথ্য সংবেদনশীল; দরকারের বাইরে সংগ্রহ করবেন না এবং অ্যাক্সেস সীমিত রাখুন।
- ব্যাকআপ: Supabase plan অনুযায়ী backup/PITR সুবিধা আলাদা হতে পারে। plan যাচাই করুন, নিরাপদ external backup এবং restore rehearsal স্থাপন করুন।
- audit_logs table আছে, কিন্তু সব action-এর automatic audit trigger এখনো নেই।
- বর্তমান ticket form cost_amount=0 রাখে; তাই এখনই পূর্ণ হিসাব, invoice, refund, report বা accounting-এর জন্য ব্যবহার করবেন না।
- পরবর্তী ধাপ: invoice numbering/print, cost-profit, client/vendor forms, receipts/payments, visa/hajj/umrah workflow, reports/export, staff admin screen, audit triggers এবং backup automation।
