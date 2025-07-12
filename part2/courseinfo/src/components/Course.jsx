import Header from './Header.jsx'
import Content from './Content.jsx'
import Total from './Total.jsx'

const Course = ({ course }) => {
    return (
        <>
            {course.map(c => (
                <div key={c.id}>
                    <Header name={c.name}/>
                    <Content parts={c.parts}/>
                    <Total total={c.parts.reduce((sum, part) => sum + part.exercises, 0)}/>
                </div>
            ))}
        </>
    );
};
export default Course