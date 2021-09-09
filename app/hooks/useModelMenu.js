import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setControllerMenu } from '../redux/reducers/controllerReducer';

function useModelMenu() {
	const dispatch = useDispatch();

	const showModelMenu = (id, listChoose) => {
		dispatch(
			setControllerMenu({
				show: true,
				id,
				listChoose,
			})
		);
	};

	const hiddenModelMenu = () => {
		dispatch(setControllerMenu({ show: false }));
	};

	return {
		hiddenModelMenu,
		showModelMenu,
	};
}

export default useModelMenu;
