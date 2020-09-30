const express = require('express');

const app = express();

app.get('/api/user', (res, req) => {

  res.json({
    name: '和方法'
  })
})


app.listen('3000')