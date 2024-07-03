import { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBag } from "../../../slices/bagSlice";
import { setBreadcrumb } from "../../../slices/breadcrumbSlice";
import styles from "./bag-detail.module.css";

const BagDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const bag = useSelector((state) => state.bags.currentThing);
  const status = useSelector((state) => state.bags.status);
  const error = useSelector((state) => state.bags.error);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    dispatch(fetchBag(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(
      setBreadcrumb([
        { label: "Home", url: "/" },
        { label: "Bags", url: "/bags/" },
        { label: bag?.name || "Bag" }, //If something ain't working check whether bag_name!!
      ])
    );
  }, [dispatch, bag]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>{error}</div>;
  }

  if (!bag) {
    return <div>Bag not found</div>;
  }

  return (
    <div className={styles.wrapper}>
      <p>
        <strong>Name:</strong> <em>{bag.bag_name}</em>
      </p>
      <p>
        <strong>Description:</strong> <em>{bag.description}</em>
      </p>
      {isLoggedIn && (
        <p>
          <strong>Owner:</strong>
          <em>
            <NavLink className={styles.link} to={`/users/${bag.user_id}/`}>
              User {bag.user_id}
            </NavLink>
          </em>
        </p>
      )}
    </div>
  );
};

export default BagDetail;
