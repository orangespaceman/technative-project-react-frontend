import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchBags } from "../../../slices/bagSlice";
import { setBreadcrumb } from "../../../slices/breadcrumbSlice";
import styles from "./bags-list.module.css";

const BagsList = () => {
    const dispatch = useDispatch();
    const bags = useSelector((state) => state.bags.items);
    const status = useSelector((state) => state.bags.status);
    const error = useSelector((state) => state.bags.error);

    useEffect(() => {
        dispatch(fetchBags());
    }, [dispatch]);

    useEffect(() => {
        dispatch(
            setBreadcrumb([{ label: "Home", url: "/" }, { label: "Bags" }])
        );
    }, [dispatch]);

    return (
        <div className={styles.wrapper}>
            {status === "loading" && <div>Loading...</div>}
            {status === "failed" && <div>{error}</div>}
            <ul className={styles.list}>
                {bags.map((bag) => (
                    <li className={styles.item} key={bag.id}>
                        <NavLink
                            className={styles.link}
                            to={`/bags/${bag.id}/`}
                        >
                            {bag.bag_name}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BagsList;
