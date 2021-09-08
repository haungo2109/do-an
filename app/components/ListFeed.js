import React, { useEffect, useState } from 'react';
import postApi from 'api/postAPI';
import Feed from 'components/Feed';

function ListFeed(props) {
	let [data, setData] = useState([]);
	useEffect(() => {
		if (data.length === 0)
			postApi
				.getPosts()
				.then((res) => {
					setData(res.results);
					console.log(res);
				})
				.catch((error) => {
					console.error(error);
				});
	}, []);

	return (
		<>{data.length !== 0 && data.map((c) => <Feed key={c.id} {...c} />)}</>
	);
}

export default ListFeed;
