import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import api from '../api/index';
import { Link } from 'react-router-dom';

const UpdateQuiz = (props) => {
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [quizData, setQuizData] = useState();
    const [isLoaded, setIsLoaded] = useState(false);

    const { register, handleSubmit } = useForm();

    const handleGetId = () => {
        const url = window.location.href;
        const id = url.split('/').slice(-1)[0];

        return id;
    };

    const onSubmit = (data) => {
        handleUpdateQuiz(handleGetId(), data);
    };

    const handleUpdateQuiz = async (id, payload) => {
        setHasSubmitted(false);

        await api.updateQuizById(id, payload).then((res) => {
            setHasSubmitted(true);
        });
    };

    useEffect(() => {
        const getQuizData = async () => {
            await api.getQuizById(handleGetId()).then((quiz) => {
                setQuizData(quiz.data.data);
                setIsLoaded(true);
            });
        };
        getQuizData();
    }, []);

    const handleChange = (e) => {
        setQuizData({ ...quizData, [e.target.name]: e.target.value });
    };

    let permissions = props.userData.permissions;

    return (
        <main className="add-quiz">
            <div className="wrapper">
                <h1>Edit quiz</h1>
                <Form
                    onSubmit={handleSubmit(onSubmit)}
                    className="add-quiz__form"
                >
                    <FormGroup>
                        <Label for="questionSet">Question set</Label>
                        <Input
                            name="questionSet"
                            id="questionSet"
                            innerRef={register}
                            required
                            value={isLoaded ? quizData.questionSet : ''}
                            onChange={handleChange}
                            readOnly={permissions !== 'Edit'}
                        ></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="question">Question</Label>
                        <Input
                            name="question"
                            id="question"
                            innerRef={register}
                            required
                            value={isLoaded ? quizData.question : ''}
                            onChange={handleChange}
                            readOnly={permissions !== 'Edit'}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="option1">Option A</Label>
                        <Input
                            name="option1"
                            id="option1"
                            innerRef={register}
                            required
                            value={isLoaded ? quizData.option1 : ''}
                            onChange={handleChange}
                            readOnly={permissions !== 'Edit'}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="option2">Option B</Label>
                        <Input
                            name="option2"
                            id="option2"
                            innerRef={register}
                            required
                            value={isLoaded ? quizData.option2 : ''}
                            onChange={handleChange}
                            readOnly={permissions !== 'Edit'}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="option3">Option C</Label>
                        <Input
                            name="option3"
                            id="option3"
                            innerRef={register}
                            required
                            value={isLoaded ? quizData.option3 : ''}
                            onChange={handleChange}
                            readOnly={permissions !== 'Edit'}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="option4">Option D</Label>
                        <Input
                            name="option4"
                            id="option4"
                            innerRef={register}
                            required
                            value={isLoaded ? quizData.option4 : ''}
                            onChange={handleChange}
                            readOnly={permissions !== 'Edit'}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="answer">Correct answer</Label>
                        <Input
                            name="answer"
                            id="answer"
                            innerRef={register}
                            required
                            type="select"
                            value={isLoaded ? quizData.answer : ''}
                            onChange={handleChange}
                            readOnly={permissions !== 'Edit'}
                        >
                            <option value="">
                                --Please select which option is the correct
                                answer--
                            </option>
                            <option>A</option>
                            <option>B</option>
                            <option>C</option>
                            <option>D</option>
                        </Input>
                    </FormGroup>
                    {hasSubmitted && (
                        <Alert color="success">
                            <p className="mb-0">Quiz editted successfully</p>
                        </Alert>
                    )}
                    {permissions === 'Edit' && (
                        <Button type="submit" color="primary">
                            Submit
                        </Button>
                    )}
                    <Button
                        color="danger"
                        className="ml-3"
                        to="/quizzes"
                        tag={Link}
                    >
                        Undo
                    </Button>
                </Form>
            </div>
        </main>
    );
};

export default UpdateQuiz;
