const express = require('express');
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('todolist', 'root', 'AEIF!qqsk%4o', {
    host: 'localhost',
    dialect: 'mysql'
});

app.post("/newtask", async (req,res)=>{
  const taskname = req.body.name;
  await sequelize.query(`INSERT INTO todolist.tasks (name, status) VALUES("${taskname}","todo")`);

  res.send(true);
});

app.post("/updatetask", async (req,res)=>{
  const task_id = req.body.task_id;
  const new_status = req.body.to;
  await sequelize.query(`UPDATE todolist.tasks SET status="${new_status}" WHERE id=${task_id}`);

  res.send(true);
});

app.post("/deletetask", async (req,res)=>{
  const task_id = req.body.task_id;
  await sequelize.query(`DELETE FROM todolist.tasks WHERE id=${task_id}`);

  res.send(true);
}); 

app.get("/todos", async (req,res)=>{
    const payload = await sequelize.query("SELECT * FROM tasks WHERE status='todo' ORDER BY id DESC");
    
    res.send(payload);
});

app.get("/done", async (req,res)=>{
  const payload = await sequelize.query("SELECT * FROM tasks WHERE status='done' ORDER BY id DESC");
  
  res.send(payload);
});

app.get("/trash", async (req,res)=>{
  const payload = await sequelize.query("SELECT * FROM tasks WHERE status='trash' ORDER BY id DESC");
  
  res.send(payload);
});

app.listen(8080);