import React , {Component} from 'react'
import {Field, reduxForm} from 'redux-form'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {createPost} from '../actions'

class PostsNew extends Component{
  renderField(field) {
    const {meta: {touched, error} } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`

    return(
      <div className={className}>
      <lable>{field.label}</lable>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-help">
          {field.meta.touched ? field.meta.error : ''}
        </div>
      </div>
    )
  }

  onSubmit(values){
    this.props.createPost(values,()=>{
      this.props.history.push('/')
    })
  }

  render() {
    const {handleSubmit} = this.props
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
      <Field
        label="Title For Post"
        name='title'
        component={this.renderField}
      />
      <Field
        label="Categories"
        name='categories'
        component={this.renderField}
      />
      <Field
        label="Post Content"
        name='content'
        component={this.renderField}
      />
      <button type="submit" className="btn btn-primary">Submit</button>
        <Link className="btn btn-danger" to="/">
          Cancel
        </Link>
      </form>

    )
  }
}

function validate(values){
  //log->{title:'a',categories:'b'}
  const errors = {};

  if(!values.title || values.title.length < 3){
    errors.title = "Enter a title that is at least 3 characters!"
  }

  if(!values.categories){
    errors.categories = "Enter some categories"
  }

  if(!values.content){
    errors.content = "Enter some content please"
  }

//If errors os empty, the form is fine to submit
// If errors has *amy* properties, redux form
  return errors

}

export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(
  connect(null, {createPost})(PostsNew)
)
