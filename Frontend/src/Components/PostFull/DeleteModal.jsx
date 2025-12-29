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

class DeleteModal extends Component {
  handleClose = (type) => {
    this.props.history.push(`/${type}/${this.props.match.params.id}`);
  };

  render() {
    
    return (
      <React.Fragment>
        <Breakpoint large up>
          <Dialog
            open={true}
            onClose={()=>this.handleClose(this.props.type)}
            aria-labelledby="form-dialog-title"
            fullWidth
            maxWidth="lg"
          >
            {/* <DialogTitle className="title">
              Do you really want to delete this file?
            </DialogTitle> */}

            <DialogContent>
              <div className="qmodal">
                <div className="qmodal__cnfm">
                  Do you really want to delete this file?
                </div>
              </div>
            </DialogContent>
            <DialogActions style={{ padding: "12px 0" }}>
              <div className="qmodal__buttons">
                <div className="qmodal__buttons__cancel">
                  <Button onClick={()=>this.handleClose(this.props.type)}>Cancel</Button>
                </div>
                <div className="qmodal__buttons__save">
                  <Button
                    style={{ background: "#ea5653" }}
                    onClick={this.props.handlePostDelete}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </DialogActions>
          </Dialog>
        </Breakpoint>

        <Breakpoint medium down>
          <Dialog
            open={true}
            onClose={()=>this.handleClose(this.props.type)}
            aria-labelledby="form-dialog-title"
            fullWidth
            fullScreen
            maxWidth="lg"
          >
            <DialogContent>
              <div className="qmodal">
                <div className="qmodal__cnfm">
                  Do you really want to delete this file?
                </div>
              </div>
            </DialogContent>
            <DialogActions style={{ padding: "12px 0" }}>
              <div className="qmodal__buttons">
                <div className="qmodal__buttons__cancel">
                  <Button onClick={()=>this.handleClose(this.props.type)}>Cancel</Button>
                </div>
                <div className="qmodal__buttons__save">
                  <Button
                    style={{ background: "#ea5653" }}
                    onClick={this.props.handlePostDelete}
                  >
                    Delete
                  </Button>
                </div>
              </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DeleteModal);
