import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { CategoryIcon } from '@/components/Icons';
import styles from './Header.module.css';
import { useGlobalContext } from '@/hooks/useGlobalContext';
import { DropTabs } from '@/components/DropTabs';
import { useEffect, useRef } from 'react';
import { CategoriesAccordian } from '../CategoriesAccordian';
import { Categories, Filters } from '@/pages';

type HeaderProps = {
    categories: Categories;
    filters: Filters;
};

export const Header = ({ categories, filters }: HeaderProps) => {
    const isMobileView = useRef(false);
    const { showHeader, setShowHeader, setCategories, setFilters } =
        useGlobalContext();

    useEffect(() => {
        setCategories(categories);
        setFilters(filters);
        isMobileView.current = window.innerWidth <= 575;
    }, []);

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

                    <Offcanvas.Body className={styles.offCanvasBody}>
                        <Nav className='me-auto'>
                            <Row
                                className={`${styles.categoryContainer} ${
                                    showHeader ? styles.flex_col : ''
                                }`}
                            >
                                {isMobileView.current ? (
                                    <CategoriesAccordian />
                                ) : (
                                    <DropTabs />
                                )}
                            </Row>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
};
