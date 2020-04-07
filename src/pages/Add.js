import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import api from '../api/index';

const Add = (props) => {
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = (data) => {
        handleIncludeQuiz(data);
        reset();
    };

    const handleIncludeQuiz = async (data) => {
        const payload = data;
        setHasSubmitted(false);

        await api.insertQuiz(payload).then((res) => {
            setHasSubmitted(true);
        });
    };

    let permissions = props.userData.permissions;

    return (
        <main className="add-quiz">
            <div className="wrapper">
                <h1>Add a quiz</h1>
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
                            readOnly={permissions !== 'Edit'}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="question">Question</Label>
                        <Input
                            name="question"
                            id="question"
                            innerRef={register}
                            required
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
                            placeholder="Please select the correct answer"
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
                            <p className="mb-0">Quiz added successfully</p>
                        </Alert>
                    )}
                    {permissions === 'Edit' && (
                        <Button type="submit" color="primary">
                            Submit
                        </Button>
                    )}
                </Form>
            </div>
        </main>
    );
};

export default Add;
