import React, { useState, useEffect } from 'react';
import { Table, Button } from 'reactstrap';
import api from '../api/index';
import { Link } from 'react-router-dom';

const Quizzes = (props) => {
    const [quizzes, setQuizzes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    async function getAll() {
        setIsLoading(true);
        await api.getAllQuizzes().then((quizzes) => {
            setQuizzes(quizzes.data.data);
            setIsLoading(false);
        });
    }

    useEffect(() => {
        getAll();
    }, []);

    const deleteUser = async (id, question) => {
        if (
            window.confirm(
                `Do tou want to delete the quiz "${question}" permanently?`
            )
        ) {
            api.deleteQuizById(id);
            getAll();
        }
    };

    let showTable = true;
    if (!quizzes.length) {
        showTable = false;
    }

    let permissions = props.userData.permissions;

    return (
        <main>
            <div className="wrapper">
                <h1>All Quizzes</h1>

                {showTable && !isLoading && (
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Question</th>
                                <th>Options</th>
                                {permissions === 'Edit' ||
                                permissions === 'View' ? (
                                    <th>Answer</th>
                                ) : (
                                    ''
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {quizzes.map((quiz, i) => (
                                <tr key={i + 1}>
                                    <th scope="row">{i + 1}</th>
                                    <td>{quiz.question}</td>
                                    <td>
                                        <ol type="A">
                                            <li>{quiz.option1}</li>
                                            <li>{quiz.option2}</li>
                                            <li>{quiz.option3}</li>
                                            <li>{quiz.option4}</li>
                                        </ol>
                                    </td>
                                    {permissions === 'Edit' ||
                                    permissions === 'View' ? (
                                        <td>{quiz.answer}</td>
                                    ) : (
                                        ''
                                    )}
                                    {permissions !== 'Edit' ? (
                                        ''
                                    ) : (
                                        <td>
                                            <Button
                                                color="danger"
                                                onClick={() =>
                                                    deleteUser(
                                                        quiz._id,
                                                        quiz.question
                                                    )
                                                }
                                            >
                                                Delete
                                            </Button>
                                            <Button
                                                tag={Link}
                                                className="ml-2"
                                                color="warning"
                                                to={'/updatequiz/' + quiz._id}
                                            >
                                                Edit
                                            </Button>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </div>
        </main>
    );
};

export default Quizzes;
