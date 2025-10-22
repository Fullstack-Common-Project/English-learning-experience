# 🎨 Global Design System — Tailwind v4

מערכת עיצוב אחידה לכל הקומפוננטות והעמודים בפרויקט.
המטרה: לאחד את הסגנון של כל הצוות – בלי inline styles ובלי HEXים – רק מחלקות גלובליות מוכנות.

---

## 📁 קבצים חשובים
| קובץ | תפקיד |
|------|--------|
| `src/app/globals.css` | מכיל את כל שכבות העיצוב הגלובלי והמחלקות המשותפות |
| `tailwind.config.mjs` | הגדרת Tailwind והרחבות מותאמות אישית |
| `postcss.config.mjs` | הגדרת PostCSS לשילוב Tailwind v4 |
| `layout.tsx` | מייבא את `globals.css` לפרויקט כולו |

---

## 🧩 שימוש בסיסי
בכל קומפוננטה או עמוד משתמשים **רק** במחלקות הגלובליות מתוך `globals.css`.
אין להוסיף HEX או style inline.

### דוגמה
```tsx
<div className="page-container">
  <h1 className="section-title">בחר משחק</h1>
  <div className="cards-grid">
    <div className="game-card">
      <div className="game-card__icon-wrap">
        <span className="game-card__icon">🎮</span>
      </div>
      <div className="game-card__title">Memory</div>
      <Button className="btn-primary">התחל</Button>
    </div>
  </div>
</div>
```

---

## 🧱 מחלקות עיקריות
| קטגוריה | מחלקה | שימוש |
|----------|--------|--------|
| **עמודים** | `page-container` | עטיפת עמוד עם padding נכון |
| | `section-title` | כותרת מרכזית לעמוד |
| | `cards-grid` | גריד להצגת קלפים |
| **קלפים** | `game-card` | קלף אחיד לכל המשחקים |
| | `game-card__icon-wrap` | עיגול אייקון בראש קלף |
| | `game-card__title` | כותרת שם המשחק |
| **כפתורים** | `btn-primary` | כפתור עיקרי (כחול) |
| | `btn-secondary` | כפתור משני |
| **תפריט ניווט** | `nav`, `nav-inner`, `nav-brand`, `nav-link` | עיצוב אחיד ל־Navbar |

---

## 🌈 טוקנים גלובליים
צבעים, טיפוגרפיה ו־RTL כבר מוגדרים:
- צבע רקע: `bg-slate-950`
- צבע טקסט: `text-white`
- פונט: **Rubik**
- כיוון: `direction: rtl`

---

## 📋 חוקים
✅ מותר להשתמש רק במחלקות הגלובליות או במחלקות Tailwind המקוריות  
🚫 אסור להשתמש ב־`style={{}}` או HEX  
🚫 אסור ליצור CSS חדש בכל קומפוננטה  
🧱 אם חסרה מחלקה – פותחים **PR** ומעדכנים את `globals.css`

---

## 🔀 תהליך עבודה ב־Git
בראנצ'ים לפי הפורמט:
```
abigail/<type>/<branch-name>
```
### סוגים
| סוג | מתי להשתמש |
|------|-------------|
| `feature` | הוספת פיצ’ר חדש |
| `fix` | תיקון באג |
| `hotfix` | תיקון דחוף בפרודקשן |
| `refactor` | שינוי מבני בקוד |
| `test` | כתיבת טסטים |
| `docs` | עדכון תיעוד |

### דוגמה:
```bash
git checkout -b abigail/feature/global-design-system
git commit -m "feat(design): add Tailwind v4 global design system"
git push -u origin abigail/feature/global-design-system
```

---

## 🧠 טיפ לצוות
לפני כל פיתוח קומפוננטה חדשה:
1. בדקו אם קיימת כבר מחלקה גלובלית מתאימה.
2. אם לא – צרו הצעה בקובץ `globals.css` ופתחו PR.
3. אל תשנו צבעים או טיפוגרפיה מחוץ לטוקנים הקיימים.

---

## 💬 תחזוקה
- מנהלת מערכת העיצוב: **אביגיל ברק**
- כל עדכון עיצוב או שינוי צבעים עובר דרך `abigail/feature/design-update`
- קובץ זה מתעדכן אוטומטית בכל שינוי גדול בעיצוב

---
