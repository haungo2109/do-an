import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
	setControllerEdit,
	setDataEditPost,
} from '../redux/reducers/controllerReducer';

function useModelEdit(title) {
	const dispatch = useDispatch();

	const showModelEdit = (
		listChoose = ['content', 'hashtag', 'images'],
		id = 0
	) => {
		let payload = { show: true, listChoose, id };
		if (title) {
			payload['title'] = title;
		}
		dispatch(setControllerEdit(payload));
	};

	const addDataEdit = (id) => {
		dispatch(setDataEditPost(id));
	};

	const hiddenModelEdit = () => {
		dispatch(setControllerEdit({ show: false, data: {} }));
	};

	return {
		hiddenModelEdit,
		showModelEdit,
		addDataEdit,
	};
}

export default useModelEdit;
