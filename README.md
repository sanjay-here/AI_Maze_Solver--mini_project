[Live Demo](https://ai-maze-solver-lilac.vercel.app/)

# 🧠 AI Maze Solver 🔍🧩

The **AI Maze Solver** is an interactive web-based visualizer built with **React.js**. It allows users to generate random mazes and watch real-time animations of classic AI algorithms like **BFS (Breadth-First Search)** and **DFS (Depth-First Search)** solving them.

---

## 🚀 Features

- 🧱 **Random Maze Generator** – Create mazes with adjustable rows, columns, and wall density.
- 👣 **Real-Time Visualization** – Watch AI algorithms explore and solve the maze step by step.
- 🧭 **Multiple Algorithms** – Choose between BFS and DFS for pathfinding.
- ⚡ **Speed Control** – Toggle visualization speed (Slow / Medium / Fast).
- 💾 **Save & Load Mazes** – Save your maze configuration with a name and reload it anytime.
- 🧼 **Maze Tools** – Clear paths, reset mazes, or draw custom wall structures by clicking or dragging on the grid.
- 📊 **Performance Metrics** – View time elapsed, nodes explored, and whether a path was found.
- 🗺️ **Legend Included** – Easily understand what each grid color represents.

---

## ⚙️ Maze Configuration

Customize the maze to your needs:

- **Rows:** Adjustable between 5 and 40.
- **Columns:** Adjustable between 5 and 40.
- **Wall Density:** Adjust the initial wall coverage between 0% and 100%.

---

## 🛠️ Tech Stack

- **Frontend:** React.js
- **State Management:** React Hooks
- **Styling:** CSS Modules / Tailwind CSS (customizable)
- **Storage:** LocalStorage (for saving/loading maze states)

---

## 💡 How to Use

1. **Generate Maze:** Use the configuration panel to adjust rows, columns, and wall density, then click *Generate Maze*.
2. **Run Algorithm:** Select either BFS or DFS, set visualization speed, and click *Solve Maze* to begin the algorithm.
3. **Customize Maze:** Click or drag on the grid to toggle walls.
4. **Manage Mazes:** Save your maze setup with a custom name or load a previously saved maze.
5. **Analyze Results:** View performance metrics such as nodes explored, time elapsed, and whether a path was found.

---

## 📦 Installation

To run the project locally:

git clone https://github.com/sanjay-here/AI_Maze_Solver.git

>cd ai-maze-solver

>npm install

>npm start

Then open http://localhost:3000 in your browser.


📁 Project Structure

ai-maze-solver/
├── public/
├── src/
│   ├── components/     # MazeGrid, ControlPanel, Settings, Legend, etc.
│   ├── algorithms/     # BFS, DFS logic
│   ├── utils/          # Maze generation and helpers
│   ├── App.jsx
│   └── index.js
├── package.json
└── README.md


🧠 Future Enhancements

Add more algorithms (A*, Dijkstra's, Greedy Best-First)

Mobile support for touch gestures

Export maze as an image or JSON

Add sound effects and animation themes

🙌 Acknowledgments
Built as part of an AI exploration project using classical pathfinding algorithms.

Inspired by visual algorithm platforms like Pathfinding Visualizer.
