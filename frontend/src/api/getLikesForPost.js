// async function getLikesForPost(id) {
//     try {
//         const response = await fetch(`http://localhost:3000/api/posts/likes/${id}`,
//         {
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             credentials: 'include',
//         },
//     );

//     if (!response.ok) {
//         throw new Error('Likes not found for post');
//     };

//     return response.json();
//     } catch(err) {
//         throw err;
//     };
// };

// export default getLikesForPost; delete this if nothing gets broken