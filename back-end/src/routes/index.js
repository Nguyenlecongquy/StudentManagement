const userR = require('./user.r')
const teacherR = require('./teacher.r')
const facultyR = require('./faculty.r')
const classR = require('./class.r')
function route(app) {

   app.use(`/user`,userR);
   app.use('/api/teacher',teacherR)
   app.use('/api/faculty',facultyR)
   app.use('/api/class',classR)

}

module.exports = route;