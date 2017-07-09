var CourseModel = require('../models/course');

class Course {
    create(data, userID, callback) {
        var course = new CourseModel(data);
        course.createdBy = userID;
        course.save((err, newcourse) => {
            if (err) {
                callback({
                    success: false,
                    message: err
                });
            } else {
                callback({
                    success: true,
                    course: newcourse
                });
                console.log("Success");
                console.log(newcourse);
            }
        });
    }


    update(data, callback) {
        CourseModel.findById(data._id, (err, course) => {
            if (err) {
                callback({
                    success: false,
                    message: 'An error occurred!'
                });
            } else if (!course) {
                callback({
                    success: false,
                    message: 'Requested course not found!'
                });
            } else {

                for (var prop in data) {
                    course[prop] = data[prop];
                }

                course.save((saveErr, updCourse) => {
                    if (err) {
                        callback({
                            success: false,
                            message: 'Error while updating course: ' + err
                        });
                    } else {
                        callback({
                            success: true,
                            course: updCourse
                        })
                    }
                });
            }
        });
    }

    addTask(data, callback) {
        CourseModel.findById(data._id, (err, course) => {
            if (err) {
                callback({
                    success: false,
                    message: 'An error occurred!'
                });
            } else if (!course) {
                callback({
                    success: false,
                    message: 'Requested course not found!'
                });
            } else {
                course['task'].push(data.task);


                course.save((saveErr, updCourse) => {
                    if (err) {
                        callback({
                            success: false,
                            message: 'Error while updating course: ' + err
                        });
                    } else {
                        callback({
                            success: true,
                            course: updCourse
                        })
                    }
                });
            }
        });
    }

    getTask(courseID, selectedTask, userData, callback) {
        CourseModel.findById(courseID, (err, course) => {
            if (err) {
                callback({
                    success: false,
                    message: 'An error occurred!'
                });
            } else if (!course) {
                callback({
                    success: false,
                    message: 'Requested course not found!'
                });
            }
            /*
             else {
             if (!course.active || userData.courses.map((e) => {
             return e.courseID
             }).indexOf(course._id) === -1 ) {
             callback({
             success: false,
             message: 'Course not active or not enrolled'
             })
             } else {
             console.log(selectedTask);
             callback({
             success: true,
             task: course.task.map((e) => {
             return e[selectedTask]
             })
             })
             }
             }
             */
        })
            .populate('task', {})
            .exec((err, res) => {

                let temp;

                for (let i = 0; i < res.task.length; i++) {
                    if (res.task[i]._id.toString() === selectedTask.toString()){
                        temp = res.task[i];
                    }
                }
                if (err) throw err;
                callback({
                    success: true,
                    data: temp
                });
            })
    }


    list(filter, order, callback) {
        CourseModel.find(filter)
            .sort(order)
            .populate('createdBy')
            .exec((err, res) => {
                if (err) throw err;
                callback({
                    success: true,
                    data: res
                });
            });
    }

    courseDetail(filter, callback) {
        CourseModel.find(filter)
            .populate('_id')
            .exec((err, res) => {
                if (err) throw err;
                callback({
                    success: true,
                    data: res
                });
            });
    }
}

module.exports = Course;