module.exports = {
    openapi: "3.0.0",
    info: {
      title: "Tour API",
      version: "1.0.0",
      description: "API для управления пользователями, выставками, виртуальными турами и т.д."
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server"
      }
    ],
    paths: {
      "/auth/register": {
        post: {
          summary: "Register a new user",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/UserRegister"
                }
              }
            }
          },
          responses: {
            201: {
              description: "User registered successfully"
            },
            500: {
              description: "Internal Server Error"
            }
          }
        }
      },
      "/auth/login": {
        post: {
          summary: "Login a user",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/UserLogin"
                }
              }
            }
          },
          responses: {
            200: {
              description: "User logged in successfully"
            },
            401: {
              description: "Unauthorized"
            },
            500: {
              description: "Internal Server Error"
            }
          }
        }
      },
      "/exhibits": {
        post: {
          summary: "Create a new exhibit",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Exhibit"
                }
              }
            }
          },
          responses: {
            201: {
              description: "Exhibit created successfully"
            },
            500: {
              description: "Internal Server Error"
            }
          }
        },
        get: {
          summary: "Get all exhibits",
          responses: {
            200: {
              description: "List of all exhibits"
            },
            500: {
              description: "Internal Server Error"
            }
          }
        }
      },
      "/exhibits/{id}": {
        get: {
          summary: "Get exhibit by ID",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: {
                type: "integer"
              }
            }
          ],
          responses: {
            200: {
              description: "Exhibit found"
            },
            404: {
              description: "Exhibit not found"
            },
            500: {
              description: "Internal Server Error"
            }
          }
        },
        put: {
          summary: "Update an exhibit by ID",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: {
                type: "integer"
              }
            }
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Exhibit"
                }
              }
            }
          },
          responses: {
            200: {
              description: "Exhibit updated successfully"
            },
            404: {
              description: "Exhibit not found"
            },
            500: {
              description: "Internal Server Error"
            }
          }
        },
        delete: {
          summary: "Delete an exhibit by ID",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: {
                type: "integer"
              }
            }
          ],
          responses: {
            200: {
              description: "Exhibit deleted successfully"
            },
            404: {
              description: "Exhibit not found"
            },
            500: {
              description: "Internal Server Error"
            }
          }
        }
      },
      "/exhibits/search": {
        get: {
          summary: "Search exhibits",
          parameters: [
            {
              name: "category",
              in: "query",
              schema: {
                type: "string"
              }
            },
            {
              name: "yearCreated",
              in: "query",
              schema: {
                type: "integer"
              }
            }
          ],
          responses: {
            200: {
              description: "List of exhibits matching the search criteria"
            },
            500: {
              description: "Internal Server Error"
            }
          }
        }
      },
      "/users": {
        get: {
          summary: "Get all users",
          responses: {
            200: {
              description: "List of all users"
            },
            500: {
              description: "Internal Server Error"
            }
          }
        }
      },
      "/users/{id}": {
        get: {
          summary: "Get user by ID",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: {
                type: "integer"
              }
            }
          ],
          responses: {
            200: {
              description: "User found"
            },
            404: {
              description: "User not found"
            },
            500: {
              description: "Internal Server Error"
            }
          }
        },
        put: {
          summary: "Update a user by ID",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: {
                type: "integer"
              }
            }
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/UserUpdate"
                }
              }
            }
          },
          responses: {
            200: {
              description: "User updated successfully"
            },
            403: {
              description: "You are not authorized to update this user"
            },
            404: {
              description: "User not found"
            },
            500: {
              description: "Internal Server Error"
            }
          }
        }
      },
      "/users/search": {
        get: {
          summary: "Search users by nickname, phone number, or email",
          parameters: [
            {
              name: "query",
              in: "query",
              required: true,
              schema: {
                type: "string"
              }
            }
          ],
          responses: {
            200: {
              description: "List of users matching the search criteria"
            },
            404: {
              description: "No users found"
            },
            500: {
              description: "Internal Server Error"
            }
          }
        }
      },
      "/users/{id}/password": {
        put: {
          summary: "Update user's password",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: {
                type: "integer"
              }
            }
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/UserPasswordUpdate"
                }
              }
            }
          },
          responses: {
            200: {
              description: "Password updated successfully"
            },
            404: {
              description: "User not found"
            },
            500: {
              description: "Internal Server Error"
            }
          }
        }
      },
      "/tours": {
        get: {
          summary: "Get all virtual tours",
          responses: {
            200: {
              description: "List of all virtual tours"
            },
            500: {
              description: "Internal Server Error"
            }
          }
        },
        post: {
          summary: "Create a new virtual tour",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/VirtualTour"
                }
              }
            }
          },
          responses: {
            201: {
              description: "Virtual tour created successfully"
            },
            500: {
              description: "Internal Server Error"
            }
          }
        }
      },
      "/tours/{id}": {
        get: {
          summary: "Get virtual tour by ID",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: {
                type: "integer"
              }
            }
          ],
          responses: {
            200: {
              description: "Virtual tour found"
            },
            404: {
              description: "Virtual tour not found"
            },
            500: {
              description: "Internal Server Error"
            }
          }
        },
        put: {
          summary: "Update a virtual tour by ID",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: {
                type: "integer"
              }
            }
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/VirtualTour"
                }
              }
            }
          },
          responses: {
            200: {
              description: "Virtual tour updated successfully"
            },
            404: {
              description: "Virtual tour not found"
            },
            500: {
              description: "Internal Server Error"
            }
          }
        },
        delete: {
          summary: "Delete a virtual tour by ID",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: {
                type: "integer"
              }
            }
          ],
          responses: {
            200: {
              description: "Virtual tour deleted successfully"
            },
            404: {
              description: "Virtual tour not found"
            },
            500: {
              description: "Internal Server Error"
            }
          }
        }
      }
    },
    components: {
      schemas: {
        UserRegister: {
          type: "object",
          properties: {
            username: {
              type: "string",
              maxLength: 30
            },
            email: {
              type: "string",
              format: "email",
              maxLength: 100
            },
            password: {
              type: "string",
              maxLength: 255
            }
          },
          required: ["username", "email", "password"]
        },
        UserLogin: {
          type: "object",
          properties: {
            email: {
              type: "string",
              format: "email",
              maxLength: 100
            },
            password: {
              type: "string",
              maxLength: 255
            }
          },
          required: ["email", "password"]
        },
        UserUpdate: {
          type: "object",
          properties: {
            username: {
              type: "string",
              maxLength: 30
            },
            email: {
              type: "string",
              format: "email",
              maxLength: 100
            }
          }
        },
        UserPasswordUpdate: {
          type: "object",
          properties: {
            oldPassword: {
              type: "string",
              maxLength: 255
            },
            newPassword: {
              type: "string",
              maxLength: 255
            }
          },
          required: ["oldPassword", "newPassword"]
        },
        Exhibit: {
          type: "object",
          properties: {
            title: {
              type: "string",
              maxLength: 100
            },
            description: {
              type: "string"
            },
            category: {
              type: "string",
              maxLength: 50
            },
            yearCreated: {
              type: "integer"
            },
            imageUrl: {
              type: "string",
              maxLength: 255
            }
          },
          required: ["title", "description", "category", "yearCreated"]
        },
        VirtualTour: {
          type: "object",
          properties: {
            title: {
              type: "string",
              maxLength: 100
            },
            description: {
              type: "string"
            },
            photo1: {
              type: "string",
              maxLength: 255
            },
            photo2: {
              type: "string",
              maxLength: 255
            },
            video1: {
              type: "string",
              maxLength: 255
            },
            audio1: {
              type: "string",
              maxLength: 255
            }
          },
          required: ["title", "description"]
        }
      }
    }
  };
  