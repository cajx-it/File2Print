<div align="center">

# 📁 File2Print

**A lightweight web-based file submission system built for printing shops, computer services, and any business that needs a clean, organized way to receive files from clients.**

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=flat-square)]()

</div>

---

## 🧩 What is File2Print?

Running a printing shop or computer service center means constantly dealing with clients sending files in all the wrong ways — via chat, email, USB drives, and more. Keeping track of who sent what, and where it went, is a mess.

**File2Print fixes this entirely.**

It provides a simple web interface where clients enter their name and upload their files. Behind the scenes, the system automatically creates a dedicated folder inside `/uploads` named after the client, and places all their files neatly inside it — no manual sorting, no confusion, no lost files.

> ✅ Perfect for **printing services**, **computer repair shops**, **internet cafés**, and **any business that receives files from multiple clients**.

---

## ✨ Features

- 🌐 **Web Interface** — Clean, browser-based upload form accessible from any device on the network
- 🗂️ **Automatic Folder Organization** — Each submission creates a uniquely named folder under `/uploads`
- 📋 **Client Metadata** — A data file is saved alongside the uploaded files with the client's name and submission details
- 📦 **Multi-file Support** — Clients can upload multiple files in a single submission
- ⚡ **Zero Configuration** — Works out of the box with a single command
- 🔒 **Local / LAN Deployment** — Designed to run on your own machine or local network

---

## 📂 How It Works

```
Client fills out the form (name + files)
        │
        ▼
Server receives the submission
        │
        ▼
Creates /uploads/<client-name>/ folder
        │
        ├── data.json        ← client info & submission metadata
        ├── file1.pdf
        ├── file2.docx
        └── ...
```

Every submission is self-contained. Just open the `/uploads` folder and everything is neatly sorted by client name.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have **Node.js v18 or higher** installed.

```bash
node -v   # Should output v18.x.x or higher
npm -v    # Should output 9.x.x or higher
```

> Download Node.js at [https://nodejs.org](https://nodejs.org)

---

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/cajx-it/File2Print.git
cd File2Print
```

**2. Install dependencies**

```bash
npm install
```

**3. Start the server**

```bash
npm start
```

**4. Open the web interface**

Navigate to:

```
http://localhost:3000
```

Your clients (on the same network) can access it via your machine's local IP:

```
http://<your-local-ip>:3000
```

---

## 🗃️ Uploads Folder Structure

After a few client submissions, your `/uploads` directory will look like this:

```
uploads/
├── Juan dela Cruz/
│   ├── data.json
│   ├── thesis_final.pdf
│   └── ID_photo.jpg
│
├── Maria Santos/
│   ├── data.json
│   └── resume.docx
│
└── John Smith/
    ├── data.json
    ├── brochure.pdf
    └── logo.png
```

No more hunting through your Downloads folder. No more asking "whose file is this?"

---

## ⚙️ Configuration

You can adjust the server port and upload destination by editing the relevant variables at the top of the main server file (e.g., `server.js` or `index.js`):

```js
const PORT = 3000;             // Change the port if needed
const UPLOAD_DIR = './uploads'; // Change the upload root directory
```

---

## 🛠️ Tech Stack

| Layer      | Technology          |
|------------|---------------------|
| Runtime    | Node.js             |
| Web Server | Express.js          |
| File Uploads | Multer            |
| Frontend   | HTML / CSS / JS     |

---

## 📋 Use Cases

| Business Type | How File2Print Helps |
|---|---|
| 🖨️ **Printing Shop** | Clients upload documents before arriving; staff can prepare jobs in advance |
| 💻 **Computer Services** | Clients send files for repair, formatting, or setup — neatly organized per client |
| 🏫 **School / Office** | Students or staff submit files without using email or USB drives |
| ☕ **Internet Café** | Customers upload files they want printed or processed |

---

## 🤝 Contributing

Contributions are welcome! If you have ideas for new features, bug fixes, or improvements:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Made with ❤️ by [cajx-it](https://github.com/cajx-it)

*Stop managing files manually. Let File2Print do it for you.*

</div>
