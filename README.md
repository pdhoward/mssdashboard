## Real-time Dashboard

The objective of this project is to demonstrate the resilency and scalability of Kafka. This monorepo is composed of a nodejs server with a Kafka consumer of two topics: product sales and subscribers. The data streams are consumed, and transformed in part through real-time analytics, and emitted using websockets.

The client is built on Reactjs, and renders several views of the streaming data received from the server

### Usage

1. npm git clone
2. cd root
3. npm run start (uses concurrently)

Subscribe to a Kafka service (such as the IBM Cloud) and provide credentials in the .env file. In addition, a set of mock product and subscriber transaction data is required, and streamed by a separate Kafka producer to emulate a production environment.

Separately, each component can be deployed to their own cloud platforms

