import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Link from 'next/link';
import styles from './Header.module.css';
import Nav from 'react-bootstrap/Nav';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useState } from 'react';
import { CategoryIcon } from '@/icons/';

type HeaderProps = { categories: string[] };

export const Header = ({ categories }: HeaderProps) => {
    const [show, setShow] = useState(false);

    return (
        <Navbar bg='light' expand={'sm'} className='mb-3'>
            <Container className={styles.container} fluid>
                <Navbar.Brand href='/'>Uniq Goods</Navbar.Brand>

                <Navbar.Toggle
                    className={styles.category_button}
                    onClick={() => setShow(true)}
                    aria-controls={`offcanvasNavbar-'md'-${'sm'}`}
                >
                    <CategoryIcon />
                </Navbar.Toggle>

                <Navbar.Offcanvas
                    onHide={() => setShow(false)}
                    show={show}
                    id={`offcanvasNavbar-'md'-${'sm'}`}
                    aria-labelledby={`offcanvasNavbarLabel-'md'-${'sm'}`}
                    placement='end'
                >
                    <Offcanvas.Header
                        className={styles.offcanvas_header}
                        closeButton
                    >
                        <Offcanvas.Title
                            id={`offcanvasNavbarLabel-'md'-${'sm'}`}
                        >
                            Categories
                        </Offcanvas.Title>
                    </Offcanvas.Header>

                    <Offcanvas.Body>
                        <Nav className='me-auto'>
                            <Row
                                onClick={() => setShow(false)}
                                className={styles.categoryContainer}
                            >
                                {categories.map((name: string, i) => (
                                    <Link
                                        href={`/category/${name}`}
                                        key={`Categories_${i}`}
                                    >
                                        <u>{name}</u>
                                    </Link>
                                ))}
                            </Row>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
};
