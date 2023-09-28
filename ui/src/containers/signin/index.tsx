import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IStore } from "../../types/store";
import { doLogin } from "../../reducers";
import { ISignInRequest } from "types";

export default function Signin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const isLoggedIn = useSelector((state: IStore) => state.auth.isLoggedin);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/me");
    }
  }, [isLoggedIn, navigate]);
  const handleSign = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (!form.checkValidity()) {
      event.stopPropagation();
    }
    setValidated(true);
    const authRequest: ISignInRequest = {
      email: userName,
      password: password,
    };
    dispatch(doLogin(authRequest));
    if (isLoggedIn) {
      navigate("/me");
    }
  };

  return (
    <Container>
      <Row className="justify-content-center d-flex align-items-center vh-100">
        <Col lg={4} md={6} sm={6}>
          <Card className="shadow">
            <Card.Title className="text-center border-bottom">
              <h2 className="p-3">Login</h2>
            </Card.Title>
            <Card.Body>
              <Form noValidate validated={validated} onSubmit={handleSign}>
                <Form.Group className="mb-4">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter Email"
                    onChange={(event) => setUserName(event.target.value)}
                  />
                  <Form.Text>kumar@gmail.com</Form.Text>
                  <Form.Control.Feedback type="invalid">Enter valid Email</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    required
                    type="Password"
                    placeholder="Enter Password"
                    onChange={(event) => setPassword(event.target.value)}
                  />
                  <Form.Text>qwerty123</Form.Text>
                  <Form.Control.Feedback type="invalid">Enter Password</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="d-grid mb-4">
                  <Button type="submit">Signin</Button>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
