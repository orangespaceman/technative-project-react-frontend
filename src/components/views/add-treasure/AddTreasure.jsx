import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setBreadcrumb } from "../../../slices/breadcrumbSlice";
import { addThing } from "../../../slices/thingsSlice";
import { showToast } from "../../../slices/toastSlice";
import styles from "./add-treasure.module.css";
import { fetchBagByUser } from "../../../slices/bagSlice";

const AddTreasure = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");

	// const bags = fetchBagByUser();
	// console.log(bags);
	// const bags = [1, 2, 3, 4, 5];
	const bags = useSelector((state) => state.bags.userBags);

	useEffect(() => {
		dispatch(
			setBreadcrumb([{ label: "Home", url: "/" }, { label: "Add treasure" }])
		);
	}, [dispatch]);

	useEffect(() => {
		dispatch(fetchBagByUser());
	}, [dispatch]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch(addThing({ name, description }));
		dispatch(showToast(`${name} added!`));
		setName("");
		setDescription("");
		navigate("/my-things/");
	};

	const selectedInput = (e) => {
		const input = e.target.value;
		console.log(input);
		console.log(Options);
		setdynamicOptions(Options[input]);
	};

	return (
		<div className={styles.wrapper}>
			<form className={styles.form} onSubmit={handleSubmit}>
				<label className={styles.inputContainer}>
					<p>Name</p>
					<input
						type="text"
						className={styles.input}
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="Name"
						required
					/>
				</label>
				<label className={styles.inputContainer}>
					<p>Description</p>
					<textarea
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						placeholder="Description"
						className={styles.treasuretextarea}
						required
					/>
				</label>
				<select onChange={selectedInput}>
					{bags.map((bag) => (
						<option key={bag.id} value={bag.id}>
							{bag.bag_name}
						</option>
					))}
				</select>
				<div className={styles.inputContainer}>
					<button className={styles.treasurebutton} type="submit">
						Add Treasure
					</button>
				</div>
			</form>
		</div>
	);
};

export default AddTreasure;
