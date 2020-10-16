Twelve-Factor App Methodology

The Twelve-Factor App methodology is a methodology for building software-as-a-service applications. These best practices are designed to enable applications to be built with portability and resilience when deployed to the web.

Motivation behind 12Factor App :

1. Use declarative formats for setup automation, to minimize time and cost for new developers joining the project.

2. Have a clean contract with the underlying operating system, offering maximum portability between execution environments.

3. Are suitable for deployment on modern cloud platforms, obviating the need for servers and systems administration.

4. Minimize divergence between development and production, enabling continuous deployment for maximum agility.

5. And can scale up without significant changes to tooling, architecture, or development practices.

The Twelve Factors are as follows:

I	Codebase	There should be exactly one codebase for a deployed service with the codebase being used for many deployments.

II	Dependencies	All dependencies should be declared, with no implicit reliance on system tools or libraries.

III	Config	Configuration that varies between deployments should be stored in the environment.

IV	Backing services	All backing services are treated as attached resources and attached and detached by the execution environment.

V	Build, release, run	The delivery pipeline should strictly consist of build, release, run.

VI	Processes	Applications should be deployed as one or more stateless processes with persisted data stored on a backing service.

VII	Port binding	Self-contained services should make themselves available to other services by specified ports.

VIII	Concurrency	Concurrency is advocated by scaling individual processes.

IX	Disposability	Fast startup and shutdown are advocated for a more robust and resilient system.

X	Dev/Prod parity	All environments should be as similar as possible.

XI	Logs	Applications should produce logs as event streams and leave the execution environment to aggregate.

XII	Admin Processes	Any needed admin tasks should be kept in source control and packaged with the application.