**Finance Tracker Backend** 

[🔗Backend Link](https://coinpilot-backend.onrender.com)

```
# 💼 Finance Tracker Backend

This is the backend API for the **Finance Tracker** application – a secure and scalable RESTful API built with **Node.js**, **Express**, and **MongoDB**. It handles core functionalities such as:

- 📊 Tracking earnings and expenses  
- 📧 Sending email notifications  
- 📄 Downloading transaction history as PDFs  

Authentication and authorization are seamlessly managed using **Clerk**, with secure access via bearer tokens.

---

## 🧰 Tech Stack

### 🔙 Backend
- **Node.js** – JavaScript runtime for building the backend server  
- **Express.js** – Web framework for routing and middleware  
- **MongoDB** – NoSQL database to persist financial data  
- **Mongoose** – ODM for MongoDB to define models and interact with the database  

### 🔐 Authentication & Security
- **Clerk** – User authentication and management  
- **Bearer Token Authorization** – Protects sensitive routes  

### 📨 Email & External Services
- **Nodemailer** – For sending transactional emails  
- **node-fetch** – Used for secure HTTP requests during PDF generation  

### 📄 Others
- **dotenv** – Loads environment variables from `.env`  
- **pdfkit** – Used to generate downloadable PDF reports  

---

## 🛠️ Project Structure

The backend is organized for modularity and clarity:

```
📁 models/
  ├── Earning.js         # Schema for earnings
  └── Expense.js         # Schema for expenses

📁 routes/
  ├── earnings.js        # CRUD for earnings
  ├── expenses.js        # CRUD for expenses
  ├── pdf.js             # PDF download route
  ├── mail.js            # Email sending route
  └── index.js           # Test route

📁 services/
  └── pdfService.js      # Logic for generating PDFs via node-fetch

📄 server.js              # Entry point, route registration, MongoDB connection


---

## 🔐 Authentication & Security

- **Authentication**: Managed via [Clerk](https://clerk.dev/)  
- **Authorization**: Secured with bearer tokens in the `Authorization` header  
- **Database**: Uses MongoDB for storing financial data  

---


```


## 🌐 Environment Variables

Create a `.env` file in the root directory and define the following:

```env
PORT=your_port_here
MONGOURI=your_mongo_connection_string
BACKEND_URL=your_backend_base_url
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_BACKEND=your_clerk_backend_url
EMAIL_USER=your_email_for_smtp
EMAIL_PASS=your_email_password
```

---

## 🚀 API Endpoints

### 🔁 Base Routes

| Method | Endpoint                      | Description                                |
|--------|-------------------------------|--------------------------------------------|
| GET    | `/`                           | Test route                                 |
| GET    | `/api/earnings`              | Get all earnings                           |
| POST   | `/api/earnings`              | Create a new earning                       |
| PUT    | `/api/earnings/:id`          | Update an earning                          |
| DELETE | `/api/earnings/:id`          | Delete an earning                          |
| GET    | `/api/expenses`              | Get all expenses                           |
| POST   | `/api/expenses`              | Create a new expense                       |
| PUT    | `/api/expenses/:id`          | Update an expense                          |
| DELETE | `/api/expenses/:id`          | Delete an expense                          |
| POST   | `/support`                   | Send email notification using Nodemailer   |
| GET    | `/pdf/:name`  | Download earnings and expenses as a PDF    |

---

## 📦 Installation & Usage

1. **Clone the repo**
   ```bash
   git clone https://github.com/Kuladeep-Reddy-C/CoinPilot-Backend.git
   cd finance-tracker-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   Create a `.env` file and fill in the required variables as shown above.

4. **Start the server**
   ```bash
   node server.js
   ```

---

## ✅ Features

- Full **CRUD** operations for both earnings and expenses 💰  
- Secure **authentication & authorization** 🔐  
- **Email notifications** for user alerts 📨  
- Export **PDF transaction reports** 📄  
- Modular and maintainable project structure 🧱

---

## 🧪 Testing

Use tools like **Postman** or **Insomnia** to test your endpoints. Make sure to include the `Authorization: Bearer <token>` header for protected routes.

---

## 📬 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

---

## 📝 License

This project is licensed under the [MIT License](LICENSE).

---

> Crafted with 💻, ☕, and care.
> Frontend Url👇⤵️
```
https://coinpilot-frontend.onrender.com
