import { NextApiRequest as Request, NextApiResponse as Response } from "next";
import { useRouter } from "next/router";

import controller from "../firebaseModule";

const index = async (req: any, res: Response) => {
  const { pid } = req.query;
  let response: any;
  console.log(req.body);
  switch (pid?.toString()) {
    case "addDocument":
      response = await controller.addDocument(req.body);
      console.log(response);
      res.status(200).send({ message: response });
      return response;
    case "addDocumentwithID":
      response = await controller.addDocumentwithID(req.body);
      console.log(response);
      res.status(response.status).send(response.message);
      return response;
    case "updateDocument":
      response = await controller.updateDocument(req.body);
      console.log(response);
      res.status(response.status).send(response.message);
      return response;
    case "deleteDocument":
      response = await controller.deleteDocument(req.body);
      console.log(response);
      res.status(response.status).send(response.message);
      return response;
    case "getCollection":
      response = await controller.getCollection(req.body);
      console.log(response);
      res.status(response.status).send(response.data);
      return response;
    case "getFilteredCollection":
      response = await controller.getFilteredCollection(req.body);
      console.log(response);
      res.status(response.status).send(response.data);
      return response;
    case "getDocument":
      response = await controller.getDocument(req.body);
      console.log(response);
      res.status(response.status).send(response.data);
      return response;
    case "login":
      response = await controller.login(req.body);
      // console.log(response);
      res.status(response.status).send(response.data);
    case "logout":
      if (pid.toString() === "logout") {
        response = await controller.logout();
        console.log("pid for logout", pid);
        // console.log(response);
        res.status(response.status).send(response.data);
      }
    case "checkAuth":
      response = await controller.checkLoggedin();
      // console.log(pid);
      res.status(response.status).send(response.data);
  }
  // console.log(response);
};

export default index;
