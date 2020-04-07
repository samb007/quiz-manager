import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';

const Home = props => {
    const { register, handleSubmit } = useForm();

    return (
        <main>
            <div className="wrapper">
                <h1>Home</h1>
                {props.isLoggedIn ? (
                    <p>
                        You are logged in as {props.userData.username} and your
                        permissions are {props.userData.permissions}
                    </p>
                ) : (
                    <Form
                        onSubmit={handleSubmit(props.onSubmit)}
                        className="add-quiz__form"
                    >
                        <FormGroup>
                            <Label for="username">Username</Label>
                            <Input
                                name="username"
                                id="username"
                                innerRef={register}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input
                                type="password"
                                name="password"
                                id="password"
                                innerRef={register}
                                required
                            />
                        </FormGroup>
                        {props.failedLogin && (
                            <Alert color="danger">
                                <p className="mb-0">
                                    Incorrect username and/or password
                                </p>
                            </Alert>
                        )}
                        <Button type="submit" color="primary">
                            Submit
                        </Button>
                    </Form>
                )}
            </div>
        </main>
    );
};

export default Home;
