const userR = require('./user.r')
const teacherR = require('./teacher.r')
const facultyR = require('./faculty.r')
const classR = require('./class.r')
const subjectR = require('./subject.r')
const studentR = require('./student.r')
const scoreR = require('./score.r')
const summaryR = require('./summary.r')
const roleR = require('./role.r')
const inforR = require('./infor.r')


function route(app) {
   app.use(`/user`,userR);
   app.use('/api/teacher',teacherR)
   app.use('/api/faculty',facultyR)
   app.use('/api/class',classR)
   app.use('/api/subject',subjectR)
   app.use('/api/student',studentR)
   app.use('/api/score',scoreR)
   app.use('/api/summary',summaryR)
   app.use('/api/role',roleR)
   app.use('/api/infor',inforR)

}

module.exports = route;