# 🔍 VeriScope AI

**Analyze. Verify. Trust.**

🚀 Live Demo: https://veri-scope-eosin.vercel.app/

---

## 🚀 Overview

VeriScope AI is a universal claim verification and misinformation detection platform designed to analyze rumors, news, and social media content. It accepts text, URLs, and social-media claim descriptions, then returns an evidence-based verdict, confidence score, explanation, suspicious keyword analysis, and supporting source links.

---

## ✨ Features

* 🔎 Multi-input claim analyzer (text, URL, social content)
* ✅ Verdict classification: **True / False / Unverified**
* 📊 Confidence score with visual indicators
* 📚 Evidence panel with verified source links
* 🧠 Explanation engine with keyword highlighting
* 📈 Trend analysis for related claims
* 👤 User authentication (secure login system)
* 📂 Search history and saved/bookmarked reports
* 🛠️ Admin dashboard with role-based access control
* 🌐 Multilingual signal detection
* ⚙️ Scalable and modular architecture

---

## 🧠 How It Works

1. User submits a claim, rumor, or link
2. System extracts and processes text
3. Fetches related data from multiple sources
4. Analyzes consistency and credibility
5. Generates:

   * Verdict (True / False / Unverified)
   * Confidence Score
   * Explanation
   * Supporting Evidence

---

## 🛠️ Tech Stack

**Frontend**

* React.js
* Tailwind CSS
* Framer Motion

**Backend / Data**

* Lovable Cloud (Database + Auth)

**Visualization**

* Recharts

**APIs**

* News / Search APIs (extendable)

---

## ⚙️ Installation & Setup

```bash id="build1"
npm install
npm run dev
```

---

## 🌐 Deployment

* Frontend → Vercel
* Backend/Data → Lovable Cloud

---

## 📂 Project Structure

```id="struct1"
veriscope-ai/
├── frontend/
├── backend/ (optional / logic layer)
├── README.md
```

---

## 🔐 Environment Variables

Lovable Cloud manages authentication and database credentials securely.
For external APIs, use environment variables or secret storage.

---

## 📊 Example Output

* Verdict: ⚠️ Unverified
* Confidence: 68%
* Explanation: Conflicting information detected across multiple sources
* Evidence: Mixed reports from different platforms

---

## 📸 Screenshots

* Home Analyzer → *Add Screenshot*
* Result Page → *Add Screenshot*
* Dashboard → *Add Screenshot*
* Admin Panel → *Add Screenshot*

---

## 🎯 Future Enhancements

* OCR support for image-based claims
* Real-time news/search API integration
* AI/NLP-powered explanations
* Browser extension support
* Exportable verification reports

---

## 👨‍💻 Author

Shubham Yadav

---

## ⭐ Contributing

Contributions are welcome! Fork the repo and submit a pull request.

---

## 📄 License

This project is licensed under the MIT License.
