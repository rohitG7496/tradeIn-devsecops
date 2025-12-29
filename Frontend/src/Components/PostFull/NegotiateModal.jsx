import React, { Component } from "react";
import { Breakpoint } from "react-socks";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  TextField,
  Grid,
} from "@material-ui/core";
import { askQuestion } from "../../redux/post/postActions";
import { connect } from "react-redux";
import { Label } from "@material-ui/icons";

class NegotiateModal extends Component {
  state = {
    price: "",
    reason: "",
  };
  handleClose = () => {
    this.props.history.push(`/buy/${this.props.match.params.id}`);
  };

  onHandleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  onHandleClick = async (e) => {
    e.preventDefault();
    // console.log(this.props.myDetails);
    await this.props.askQuestionDispatch(
      this.state.question,
      this.props.match.params.id,
      this.props.myDetails.username
    );
    this.handleClose();
  };

  render() {
    const { question } = this.state;
    return (
      <React.Fragment>
        <Breakpoint large up>
          <Dialog
            open={true}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
            fullWidth
            maxWidth="lg"
          >
            <DialogTitle className="title">
              <h2>Negotiate</h2>
            </DialogTitle>

            <DialogContent dividers>
              <div className="qmodal">
                <div className="login__right__myForm__formData">
                  <label htmlFor="price" style={{ fontSize: "1.15rem" }}>
                    Price
                  </label>

                  <TextField
                    type="text"
                    required
                    //   value={question}
                    onChange={this.onHandleChange}
                    className="login__right__myForm__formData__username"
                    variant="outlined"
                    name="price"
                    style={{ padding: "8px" }}
                    rows={12}
                  ></TextField>
                  {/* <FormHelperText className="errormessage">
                        {formErrors.password}
                      </FormHelperText> */}
                </div>
                <div className="login__right__myForm__formData">
                  <label htmlFor="price" style={{ fontSize: "1.15rem" }}>
                    Reason
                  </label>
                  <TextField
                    type="text"
                    required
                    //   value={question}
                    placeholder="Optional"
                    onChange={this.onHandleChange}
                    className="login__right__myForm__formData__username"
                    variant="outlined"
                    name="reason"
                    style={{ padding: "8px" }}
                    rows={12}
                  ></TextField>
                  {/* <FormHelperText className="errormessage">
                        {formErrors.password}
                      </FormHelperText> */}
                </div>
              </div>
            </DialogContent>
            <DialogActions style={{ padding: "12px 0" }}>
              <div className="qmodal__buttons">
                <div className="qmodal__buttons__cancel">
                  <Button onClick={this.handleClose}>Cancel</Button>
                </div>
                <div className="qmodal__buttons__save">
                  <Button
                    style={{ background: "#D83F87" }}
                    onClick={this.onHandleClick}
                  >
                    Negotiate
                  </Button>
                </div>
              </div>
            </DialogActions>
          </Dialog>
        </Breakpoint>

        <Breakpoint medium down>
          <Dialog
            open={true}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
            fullWidth
            fullScreen
            maxWidth="lg"
          >
            <DialogTitle className="title">
              <h2>Negotiate</h2>
            </DialogTitle>

            <DialogContent dividers>
              <div className="qmodal">
                <div className="login__right__myForm__formData">
                  <label htmlFor="price" style={{ fontSize: "1.15rem" }}>
                    Price
                  </label>

                  <TextField
                    type="text"
                    required
                    //   value={question}
                    onChange={this.onHandleChange}
                    className="login__right__myForm__formData__username"
                    variant="outlined"
                    name="price"
                    style={{ padding: "8px" }}
                    rows={12}
                  ></TextField>
                  {/* <FormHelperText className="errormessage">
                        {formErrors.password}
                      </FormHelperText> */}
                </div>
                <div className="login__right__myForm__formData">
                  <label htmlFor="price" style={{ fontSize: "1.15rem" }}>
                    Reason
                  </label>

                  <TextField
                    type="text"
                    required
                    //   value={question}
                    placeholder="Optional"
                    onChange={this.onHandleChange}
                    className="login__right__myForm__formData__username"
                    variant="outlined"
                    name="reason"
                    style={{ padding: "8px" }}
                    rows={12}
                  ></TextField>
                  {/* <FormHelperText className="errormessage">
                        {formErrors.password}
                      </FormHelperText> */}
                </div>
              </div>
            </DialogContent>
            <DialogActions style={{ padding: "12px 0" }}>
              <div className="qmodal__buttons">
                <div className="qmodal__buttons__cancel">
                  <Button onClick={this.handleClose}>Cancel</Button>
                </div>
                <div className="qmodal__buttons__save">
                  <Button
                    style={{ background: "#D83F87" }}
                    onClick={this.onHandleClick}
                  >
                    Negotiate
                  </Button>
                </div>
              </div>
              {/* <Grid container spacing={2} className="qmodal__buttons">
                <Grid item xs={6} className="qmodal__buttons__cancel">
                  <Button onClick={this.handleClose}>Cancel</Button>
                </Grid>
                <Grid item xs={6} className="qmodal__buttons__save">
                  <Button onClick={this.onHandleClick}>Negotiate</Button>
                </Grid>
              </Grid> */}
            </DialogActions>
          </Dialog>
        </Breakpoint>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    // isLogged: state.token.access,
    myDetails: state.myDetails.myDetails,
    // loading: state.post.loading,
    // post: ownProps.match.params.id ? state.post.posts[ownProps.match.params.id] :{}
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    askQuestionDispatch: (question, postId, user) =>
      dispatch(askQuestion(question, postId, user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NegotiateModal);
