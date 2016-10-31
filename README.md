# drugstore-di

Simple [or not] and possibly useless DI library for node.
If you have some ideas to implement and make it somehow usable, pls write an issue or mail me.

# Functionality overview

Allows you to declare modules/services and inject them into other functions.
All modules are stored in register and could be overriden during the execution.
There is possibility to implement "contracts", which are basically list of functions
with arguments(only arguments count is checked for now).

Module is function that returns some object which could implement contract.
