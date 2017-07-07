import React, {Component} from 'react'
import Card from './CourseCard'
import ShowMoreLess from './ShowMoreCard'
import {Segment, Container} from 'semantic-ui-react'
import courseData from '../../data/Courses'
import '../../styles/CoursesSegment.css'

import $ from 'jquery'

let courseInfo;

class CoursesSegment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            attendedCourses: this.props.courses,
            userCourses: [],
            itemsToShow: 3,
            expanded: false,
            courses: [],
            dataFetched: false
        }
        this.showMore = this.showMore.bind(this)

        $.ajaxSetup({
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authentication", "Bearer " + localStorage.getItem("odslearncode"));
            }
        });
        $.get('http://localhost:8080/api/course/listactive')
            .done((courses) => {
                this.setState({
                    courses: courses.data
                });
                this.handleCoursesFetched();
            });


    }

    handleCoursesFetched(){
        var foo = this.props.courses.map((value) => {
            return value.courseID;
        });

        let bar = this.state.courses.map((value) => {
            return value._id;
        });

        for (let temp in foo){
            console.log(this.state.courses[bar.indexOf(foo[temp])]);
            let singleCourse = this.state.userCourses;
            singleCourse.push(this.state.courses[bar.indexOf(foo[temp])]);
            this.setState({
                userCourses: singleCourse
            })
        }


        courseInfo = this.state.userCourses.slice(0, this.state.itemsToShow).map((course, i) =>
         <Card course={course}/>
         );

        this.setState({
            dataFetched: true
        });

        console.log(this.state.userCourses);



    }

    showMore() {
        this.state.itemsToShow === 3 ? (
            this.setState({itemsToShow: this.props.courses.length, expanded: true})
        ) : (
            this.setState({itemsToShow: 3, expanded: false})
        )
    }

    render() {

        return <Container fluid className="CoursesSegment">
            <Segment>
                <h2>Your Courses</h2>
                <h3>You attend to: {this.props.courses.length} courses</h3>
                {
                    this.props.courses.length === 0
                        ? <div>
                        It looks empty here. How about looking for some courses?
                    </div>
                        :
                        <div>
                            {
                                this.state.dataFetched
                                ? <p>{courseInfo}</p>
                                    : null

                            }

                            <a className="" onClick={this.showMore}>
                                {this.state.expanded ? (
                                    <ShowMoreLess icon="arrow up" text="Show less courses"/>
                                ) : (
                                    <ShowMoreLess icon="arrow down" text="Show more courses"/>
                                )
                                }
                            </a>
                        </div>
                }

            </Segment>
        </Container>
    }
}

export default CoursesSegment