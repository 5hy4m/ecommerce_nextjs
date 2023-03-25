import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Link from 'next/link';
import Nav from 'react-bootstrap/Nav';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useState } from 'react';
import { CategoryIcon } from '@/icons/';
import styles from './Header.module.css';

type HeaderProps = { categories: string[] };

export const Header = ({ categories }: HeaderProps) => {
    const [show, setShow] = useState(false);

    return (
        <Navbar bg='dark' expand={'sm'} className={styles.navbar}>
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
                    className={styles.offcanvas}
                    show={show}
                    id={`offcanvasNavbar-'md'-${'sm'}`}
                    aria-labelledby={`offcanvasNavbarLabel-'md'-${'sm'}`}
                    placement='end'
                >
                    <Offcanvas.Header className={styles.offcanvas_header}>
                        <Offcanvas.Title
                            className={styles.offcanvas_title}
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
