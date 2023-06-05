import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { CategoryIcon } from '@/components/Icons';
import styles from './Header.module.css';
import { useGlobalContext } from '@/hooks/useGlobalContext';
import { DropTabs } from '@/components/DropTabs';

type HeaderProps = {};

export const Header = ({}: HeaderProps) => {
    const { showHeader, setShowHeader } = useGlobalContext();
    return (
        <Navbar id='header' bg='dark' expand={'sm'} className={styles.navbar}>
            <Container className={styles.container} fluid>
                <Navbar.Brand href='/' className={styles.logo}>
                    Uniq Goods
                </Navbar.Brand>

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
                                <DropTabs />
                                {/* {Object.entries(allCategories).map(
                                    (allCategory, i) => {
                                        const [category, subCategories] =
                                            allCategory;
                                        return (
                                            <Link
                                                href={`/category/${category}`}
                                                key={`Categories_${i}`}
                                            >
                                                <u>{category}</u>
                                            </Link>
                                        );
                                    },
                                )} */}
                            </Row>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
};
