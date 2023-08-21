
# StackOverFlow Clone

List of APIs created:
* Create User 
    * A user can register himself on the system
    * A user can login on the system
* Create Questions
    * User can add a Questions
* Update Questions
    * User can update his Questions
* Delete Questions
    * User can delete his Questions
* All Questions 
    * List of the all questions with: 
        * search query, 
        * sort based on question text, 
        * filter based on tags
* Comments: 
    * Commenting system for questions and answers.
    * User can add answers by Commenting
* Votes
    * a user can vote (upvotes/downvotes) for questions and answers (comments).

## Installation

Clone the repository

```bash
git clone https://github.com/vipulchaudhary16/shipmnts-task-backend
```

Create .env file at root directory of this project

```
touch .env
```

Add this required data to the file

```bash
# port for server
PORT = 8080
# mongodb atlas or local url
MONGODB_URL =
# Secret key for jwt authentication
JWT_SECRET_KEY = ""
```

Install node modules

```bash
npm install
```

Start the server

```bash
npm start
```

### Documentation

[Access here](https://documenter.getpostman.com/view/16310010/2s9Y5Ty4Ya)
    
