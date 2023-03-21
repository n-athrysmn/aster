import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  //CHECK EXISTING USER
  const q1 = "SELECT * FROM students WHERE studentEmail = ?";
  const q2 = "SELECT * FROM parents WHERE parentEmail = ?";

  db.query(q1, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("The email is used by a student!");

    // If the email is not found in the 'students' table, check the 'parents' table
    db.query(q2, [req.body.email], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length) return res.status(409).json("The email is used by a parent!");

    //Hash the password and create a user
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const q = "INSERT INTO students(`studentName`,`studentEmail`,`studentNumber`, `studentBirth`, `studentAddr`, `studentSch`, `studentLevel`, `studentGrade`, `studentPfp`, `studentPass`) VALUES (?)";
    const values = [req.body.name, req.body.email, req.body.number, req.body.birthday, req.body.address, req.body.school, req.body.level, req.body.grade, req.body.pfp, hash];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User has been created.");
    });
    });
  });
};

export const parent = (req, res) => {
   //CHECK EXISTING USER
  const q1 = "SELECT * FROM students WHERE studentEmail = ?";
  const q2 = "SELECT * FROM parents WHERE parentEmail = ?";

  db.query(q1, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("The email is used by a student!");

    // If the email is not found in the 'students' table, check the 'parents' table
    db.query(q2, [req.body.email], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length) return res.status(409).json("The email is used by a parent!");
  
      //Hash the password and create a user
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
  
      const q = "INSERT INTO parents (`parentName`, `parentEmail`, `parentNumber`, `parentJob`, `parentSalary`, `parentAddr`, `parentPfp`, `parentPass`) VALUES (?)";
      const values = [req.body.name, req.body.email, req.body.number, req.body.job, req.body.salary, req.body.address, req.body.pfp, hash];
  
      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("User has been created.");
      });
      });
    });
  };

  export const login = (req, res) => {
    //CHECK USER
    const q1 = "SELECT * FROM students WHERE studentEmail = ?";
    const q2 = "SELECT * FROM parents WHERE parentEmail = ?";
  
    // Try to find the user in the 'students' table
    db.query(q1, [req.body.email], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length > 0) {
        // User found in 'students' table
        const isPasswordCorrect = bcrypt.compareSync(
          req.body.password,
          data[0].studentPass
        );
        if (!isPasswordCorrect) {
          return res.status(400).json("Wrong username or password!");
        }
        const token = jwt.sign(
          { id: data[0].id, type: "student" },
          "jwtkey"
        );
        const { studentPass, ...other } = data[0];
        return res
          .cookie("access_token", token, {
            httpOnly: true,
          })
          .status(200)
          .json(other);
      } else {
        // Try to find the user in the 'parents' table
        db.query(q2, [req.body.email], (err, data) => {
          if (err) return res.status(500).json(err);
          if (data.length > 0) {
            // User found in 'parents' table
            const isPasswordCorrect = bcrypt.compareSync(
              req.body.password,
              data[0].parentPass
            );
            if (!isPasswordCorrect) {
              return res.status(400).json("Wrong username or password!");
            }
            const token = jwt.sign(
              { id: data[0].id, type: "parent" },
              "jwtkey"
            );
            const { parentPass, ...other } = data[0];
            return res
              .cookie("access_token", token, {
                httpOnly: true,
              })
              .status(200)
              .json(other);
          } else {
            return res.status(404).json("User not found!");
          }
        });
      }
    });
  };
  
  

export const logout = (req, res) => {
  res.clearCookie("access_token",{
    sameSite:"none",
    secure:true
  }).status(200).json("User has been logged out.")
};
