// app.get('/v1/text', async (req, res) => {
//   const command = new GetObjectCommand({
//     Bucket: process.env.AWS_S3_BUCKET_NAME,
//     Key: 'test-directory/test.txt',
//   });
//   try {
//     const response = await s3Instance.send(command);
//     const body = await response.Body?.transformToString();
//     console.log(body);
//     return res.status(200).json({ content: body });
//     // return res.status(200).json(response)
//   } catch (error) {
//     logger.error(error);
//     return res.status(500).json(error);
//   }
// });
