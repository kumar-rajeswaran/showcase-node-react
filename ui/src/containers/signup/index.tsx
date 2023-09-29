// SignupForm.tsx
import React, { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { doSignUp } from "reducers";
import { IStore } from "types";

interface ISignUpRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: IStore) => state.auth.isLoggedin);
  const [formData, setFormData] = useState<ISignUpRequest>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [confirmPassword, setconfirmPassword] = useState<string>("");
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/me");
    }
  }, [isLoggedIn, navigate]);

  const isEmailValid = (): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(formData.email);
  };

  const isPasswordValid = (): boolean => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=.{8,})/;
    return passwordRegex.test(formData.password);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    e.preventDefault();
    if (!form.checkValidity()) {
      e.stopPropagation();
    }
    setValidated(true);
    dispatch(doSignUp(formData));
  };

  return (
    <Container>
      <Row className="justify-content-center d-flex align-items-center vh-100">
        <Col lg={4} md={6} sm={6}>
          <Card className="shadow">
            <Card.Title className="text-center border-bottom">
              <h2 className="p-3">SignUp</h2>
            </Card.Title>
            <Card.Body>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group controlId="formFirstName" className="mb-4">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formLastName" className="mb-4">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formEmail" className="mb-4">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    isInvalid={!isEmailValid()}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formPassword" className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    isInvalid={!isPasswordValid()}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formConfirmPassword" className="mb-4">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    isInvalid={confirmPassword !== formData.password}
                    onChange={(evt) => {
                      setconfirmPassword(evt.target?.value);
                    }}
                    required
                  />
                </Form.Group>
                <Form.Group className="d-grid mb-4">
                  <Button type="submit">Signup</Button>
                </Form.Group>
              </Form>
              <p className="mt-3">
                Already have an account? <Link to="/signin">Sign In</Link>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
