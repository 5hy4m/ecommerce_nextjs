import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Link from 'next/link';
import Nav from 'react-bootstrap/Nav';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { CategoryIcon } from '@/components/Icons';
import styles from './Header.module.css';
import { useGlobalContext } from '@/hooks/useGlobalContext';

type HeaderProps = { categories: string[] };

export const Header = ({ categories }: HeaderProps) => {
    const { showHeader, setShowHeader } = useGlobalContext();

    return (
        <Navbar id='header' bg='dark' expand={'sm'} className={styles.navbar}>
            <Container className={styles.container} fluid>
                <Navbar.Brand href='/'>Uniq Goods</Navbar.Brand>

                <Navbar.Toggle
                    className={styles.category_button}
                    onClick={() => setShowHeader(true)}
                    aria-controls={`offcanvasNavbar-'md'-${'sm'}`}
                >
                    <CategoryIcon />
                </Navbar.Toggle>

                <Navbar.Offcanvas
                    onHide={() => setShowHeader(false)}
                    className={styles.offcanvas}
                    show={showHeader}
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
                                onClick={() => setShowHeader(false)}
                                className={`${styles.categoryContainer} ${
                                    showHeader ? styles.flex_col : ''
                                }`}
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
