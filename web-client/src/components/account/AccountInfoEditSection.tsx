import { useEffect, useState } from "react";

import { validUsername, validEmail } from "../../utils-module/validation";
import GenericPromptDialog from "../GenericPromptDialog";

//redux
import { editUser } from "../../slices/usersSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setAlert } from "../../slices/utilitySlice";

//mui
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import LoadingButton from "@mui/lab/LoadingButton";

//mui icons
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

//types
import { FC } from "react";
import { User } from "../../slices/usersSlice";

interface propTypes {
  userData: User;
  setViewEdit: React.Dispatch<React.SetStateAction<boolean>>;
}
const UserInfoEditSection: FC<propTypes> = ({ userData, setViewEdit }) => {
  const dispatch = useAppDispatch();

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const [username, setUsername] = useState(userData.username);
  const [firstname, setFirstname] = useState(userData.firstname);
  const [lastname, setLastname] = useState(userData.lastname);
  const [email, setEmail] = useState(userData.email);

  const [password, setPassword] = useState("");
  const [passwordconfirm, setPasswordConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordsMismatch, setPasswordsMismatch] = useState(false);

  const [disableButtons, setDisableButtons] = useState(false);

  const validateInput = async () => {
    //check existance of required fields
    if (
      firstname === "" ||
      lastname === "" ||
      email === "" ||
      username === ""
    ) {
      dispatch(
        setAlert({
          severity: "warning",
          title: "Warning",
          message: "Please fill all of the fields.",
        })
      );
      return false;
    }

    if (password && password !== passwordconfirm) {
      setPasswordsMismatch(true);
      setPasswordConfirm("");
      return false;
    }

    if (!validUsername(username || "")) {
      return false;
    }

    if (!(await validEmail(email || ""))) {
      return false;
    }
    return true;
  };

  const onEditUser = async () => {
    let isValidInputs = await validateInput();
    if (!isValidInputs) {
      return;
    }
    setDisableButtons(true);
    let editRes = await dispatch(
      editUser({
        action: "editSelf",
        userData: {
          _id: userData._id,
          role: userData.role,
          username,
          firstname,
          lastname,
          email,
        },
      })
    );
    setDisableButtons(false);
    if (editRes.meta.requestStatus === "fulfilled") {
      setViewEdit(false);
    }
  };

  return (
    <div className="account-info-edit-section">
      <div className="edit-container">
        <div>Basic Info</div>

        <div>
          <FormControl className="edit-user-firstname">
            <TextField
              sx={{
                minWidth: 120,
                margin: "5px",
              }}
              label="First Name"
              variant="outlined"
              defaultValue={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </FormControl>
          <FormControl className="edit-user-lastname">
            <TextField
              sx={{
                minWidth: 120,
                margin: "5px",
              }}
              label="Last Name"
              variant="outlined"
              defaultValue={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </FormControl>
        </div>

        <FormControl className="edit-user-email">
          <TextField
            sx={{
              minWidth: 120,
              margin: "5px",
            }}
            label="Email"
            variant="outlined"
            defaultValue={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <Divider />
        <div>Authentication</div>
        <FormControl className="edit-user-username">
          <TextField
            sx={{
              minWidth: 120,
              margin: "5px",
            }}
            label="Username"
            variant="outlined"
            defaultValue={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>
        <div>
          <FormControl id="authentication-password-input" variant="outlined">
            <InputLabel htmlFor="authentication-password-input">
              Password
            </InputLabel>
            <OutlinedInput
              autoComplete="new-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              label="Password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="start"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl
            id="authentication-passwordconfirm-input"
            variant="outlined"
          >
            <InputLabel htmlFor="authentication-passwordconfirm-input">
              Confirm Password
            </InputLabel>
            <OutlinedInput
              type={showPassword ? "text" : "password"}
              value={passwordconfirm}
              onChange={(e) => {
                setPasswordConfirm(e.target.value);
              }}
              label="Password Confirm"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="start"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {passwordsMismatch && (
              <span style={{ color: "red", fontSize: "13px" }}>
                Passwords do not match, Please Try Again
              </span>
            )}
          </FormControl>
        </div>
      </div>
      <Button
        className="secondary"
        variant="contained"
        onClick={() => setViewEdit(false)}
      >
        Cancel
      </Button>
      <LoadingButton
        className="primary"
        variant="contained"
        onClick={() => setOpenConfirmDialog(true)}
        loading={disableButtons}
      >
        Save Changes
      </LoadingButton>
      <GenericPromptDialog
        open={openConfirmDialog}
        setOpen={setOpenConfirmDialog}
        onConfirm={onEditUser}
        title="Confirm Changes?"
        text={`Save changes made to account info?`}
      />
    </div>
  );
};

export default UserInfoEditSection;
