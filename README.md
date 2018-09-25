# TimeDelta

Helper class to compare two timestamps. 

## Example

```jsx

cosnt timeDelta = new TimeDelta();

// api

timeDelta
    .stamp(+new Date())
    .isWithin()
    .days(5)
    .hours(4)
    .minutes(45)
    .seconds(30)
    .ofNow();

timeDelta
    .stamp(entity.timestamp)
    .isWithin(entity.cache.maxAge)
    .of(+new Date())

```

## License

MIT
