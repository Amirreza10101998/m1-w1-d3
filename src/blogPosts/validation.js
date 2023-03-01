import { checkSchema, validationResult } from "express-validator";

const schema = {
    category: {
      in: ['body'],
      isString: {
        errorMessage: 'Category validation failed, type must be a string'
      },
      notEmpty: {
        errorMessage: 'Category validation failed, value cannot be empty'
      }
    },
    title: {
      in: ['body'],
      isString: {
        errorMessage: 'Title validation failed, type must be a string'
      },
      notEmpty: {
        errorMessage: 'Title validation failed, value cannot be empty'
      }
    },
    cover: {
      in: ['body'],
      isString: {
        errorMessage: 'Cover validation failed, type must be a string'
      },
      notEmpty: {
        errorMessage: 'Cover validation failed, value cannot be empty'
      }
    },
    'readTime.value': {
      in: ['body'],
      isNumeric: {
        errorMessage: 'Read time value validation failed, type must be a number'
      }
    },
    'readTime.unit': {
      in: ['body'],
      isString: {
        errorMessage: 'Read time unit validation failed, type must be a string'
      },
      notEmpty: {
        errorMessage: 'Read time unit validation failed, value cannot be empty'
      }
    },
    'author.name': {
      in: ['body'],
      isString: {
        errorMessage: 'Author name validation failed, type must be a string'
      },
      notEmpty: {
        errorMessage: 'Author name validation failed, value cannot be empty'
      }
    },
    'author.avatar': {
      in: ['body'],
      isString: {
        errorMessage: 'Author avatar validation failed, type must be a string'
      },
      notEmpty: {
        errorMessage: 'Author avatar validation failed, value cannot be empty'
      }
    },
    content: {
      in: ['body'],
      isString: {
        errorMessage: 'Content validation failed, type must be a string'
      },
      notEmpty: {
        errorMessage: 'Content validation failed, value cannot be empty'
      }
    }
  };
  

export const checkBlogPostSchema = checkSchema(schema);

export const checkValidationResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Blog post validation failed!");
      error.status = 404;
      console.log('Validation errors:', errors.array());
      return next(error);
    }
    next();
  };
  
