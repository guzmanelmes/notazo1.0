// ============================================
// Posts del blog (SEO-friendly, sin auth)
// ============================================

export interface BlogPost {
  slug: string
  title: string
  description: string
  keywords: string
  date: string // ISO
  readTime: number // minutos
  category: string
  content: string // Markdown
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'como-calcular-promedio-ponderado-chile',
    title: 'Cómo calcular promedio ponderado en Chile (guía completa)',
    description:
      'Aprende paso a paso cómo calcular tu promedio ponderado en la escala chilena 1.0 a 7.0. Con ejemplos prácticos y fórmulas.',
    keywords: 'promedio ponderado chile, calcular promedio, promedio ponderado fórmula',
    date: '2026-06-15',
    readTime: 5,
    category: 'Calculadoras',
    content: `
El promedio ponderado es el método que usan casi todas las instituciones educativas en Chile
para calcular la nota final de un ramo. A diferencia del promedio simple, este le da un "peso"
distinto a cada evaluación según su importancia.

## ¿Qué es el promedio ponderado?

Es el promedio de notas donde cada nota tiene un **porcentaje de incidencia** (ponderación)
sobre la nota final. Por ejemplo, si una prueba vale 30% y otra 70%, el promedio ponderado
será distinto al promedio simple.

## Fórmula del promedio ponderado

La fórmula es muy sencilla:

> **Promedio = Σ (nota × ponderación) / 100**

Donde Σ es la suma de todas las notas multiplicadas por su ponderación.

## Ejemplo práctico

Supón que tienes estas evaluaciones:

| Evaluación | Nota | Ponderación |
|------------|------|-------------|
| Prueba 1   | 6.0  | 30%         |
| Prueba 2   | 5.0  | 30%         |
| Examen     | 4.0  | 40%         |

El cálculo sería:

> (6.0 × 30) + (5.0 × 30) + (4.0 × 40) = 180 + 150 + 160 = **490**
>
> 490 / 100 = **4.9**

Tu promedio ponderado final es **4.9**.

## ¿Qué pasa si las ponderaciones no suman 100%?

Si las ponderaciones suman menos o más de 100%, hay un error en los datos. Siempre revisa que:

- La suma sea exactamente 100%
- Cada ponderación esté en el rango 0-100%
- Las notas estén en el rango 1.0 a 7.0

## ¿Y si no tengo todas las notas?

Si aún no tienes todas las notas, **usa la calculadora de "¿Qué nota necesito?"** para
saber qué calificación te falta para alcanzar tu objetivo.

## Conclusión

El promedio ponderado es más justo que el promedio simple porque refleja la importancia real
de cada evaluación. Con Notazo puedes calcularlo al instante y simular diferentes escenarios.
    `,
  },
  {
    slug: 'que-nota-necesito-para-aprobar',
    title: '¿Qué nota necesito para aprobar? Calcula en segundos',
    description:
      'Descubre la fórmula para saber qué nota necesitas en una evaluación pendiente para alcanzar tu promedio objetivo.',
    keywords: 'qué nota necesito, nota para aprobar, calculadora nota necesaria',
    date: '2026-06-18',
    readTime: 4,
    category: 'Calculadoras',
    content: `
Una de las preguntas más comunes entre estudiantes es: **¿qué nota necesito en el examen final
para aprobar el ramo?** La respuesta depende de tres datos clave.

## Los 3 datos que necesitas

1. **Tu promedio actual**: las notas que llevas hasta ahora (considerando sus ponderaciones).
2. **La ponderación pendiente**: el porcentaje que vale la evaluación que te falta.
3. **Tu nota objetivo**: el promedio final que quieres alcanzar (generalmente 4.0 para aprobar).

## Fórmula

La fórmula es:

> **Nota necesaria = (Objetivo − Promedio_actual × (100 − P) / 100) / (P / 100)**

Donde **P** es la ponderación pendiente (en porcentaje).

## Ejemplo

Tienes un promedio actual de **4.5** y quieres alcanzar un **5.0** final. Te queda una
evaluación que vale **40%**.

> Nota necesaria = (5.0 − 4.5 × (100 − 40) / 100) / (40 / 100)
>
> Nota necesaria = (5.0 − 4.5 × 0.6) / 0.4
>
> Nota necesaria = (5.0 − 2.7) / 0.4
>
> Nota necesaria = 2.3 / 0.4 = **5.75**

Necesitas un **5.75** en esa evaluación para terminar con un 5.0 final.

## ¿Y si es imposible?

A veces el objetivo es inalcanzable. Por ejemplo, si necesitas un 8.5 (que no existe, porque la
escala chilena va hasta 7.0). En esos casos, la calculadora de Notazo te avisará claramente.

## Tip útil

Si tu promedio objetivo es 4.0 (solo aprobar) y tienes buenas notas previas, es posible que
incluso un 2.0 o 3.0 te alcance. ¡Verifícalo siempre!

## Conclusión

Con esta fórmula (o con nuestra herramienta) puedes planificar tu estrategia de estudio
sabiendo exactamente qué necesitas.
    `,
  },
  {
    slug: 'convertir-puntaje-a-nota-chile',
    title: 'Cómo convertir puntaje a nota chilena (1.0 a 7.0)',
    description:
      'Aprende la fórmula oficial para convertir cualquier puntaje (sobre 100, 1000, etc.) a la escala chilena de notas 1.0 a 7.0.',
    keywords: 'convertir puntaje a nota, puntaje a nota chile, escala notas chilenas',
    date: '2026-06-20',
    readTime: 4,
    category: 'Calculadoras',
    content: `
Muchas veces tienes un puntaje bruto (por ejemplo 72 sobre 100) y necesitas saber
qué nota equivale en la escala chilena de 1.0 a 7.0. Aquí te enseñamos cómo.

## ¿Cómo funciona?

La conversión se hace mediante una **regla de tres simple**, pero considerando dos tramos:

1. **Tramo de reprobación** (entre 1.0 y la nota de aprobación)
2. **Tramo de aprobación** (entre la nota de aprobación y 7.0)

## Parámetros

Necesitas definir:

- **Puntaje máximo** (ej: 100, 1000, 70)
- **Exigencia**: porcentaje de logro que necesitas para obtener un 4.0. Lo estándar es **60%**.
- **Nota de aprobación**: en Chile es **4.0**.

## Fórmulas

**Si tu puntaje es menor al de exigencia:**

> Nota = 1.0 + (puntaje / exigencia_absoluta) × (4.0 − 1.0)

**Si tu puntaje es mayor o igual al de exigencia:**

> Nota = 4.0 + ((puntaje − exigencia_absoluta) / (puntaje_máx − exigencia_absoluta)) × (7.0 − 4.0)

## Ejemplo

Tienes **72 puntos sobre 100**, con exigencia al 60%.

- Exigencia absoluta: 60 (60% de 100)
- Como 72 > 60, estás en el tramo de aprobación.

> Nota = 4.0 + ((72 − 60) / (100 − 60)) × (7.0 − 4.0)
>
> Nota = 4.0 + (12 / 40) × 3.0
>
> Nota = 4.0 + 0.3 × 3.0
>
> Nota = 4.0 + 0.9 = **4.9**

Un 72/100 equivale a un **4.9**.

## Aplicaciones prácticas

Esta conversión se usa en:

- **PAES**: convierte tu puntaje PAES a una estimación de nota.
- **Solemnes y pruebas** universitarias.
- **Pruebas internacionales** que necesitas homologar.
- **Ensayos PSU** y preuniversitarios.

## Conclusión

Con la fórmula correcta puedes convertir cualquier puntaje a la escala chilena. Si no quieres
hacerlo a mano, usa nuestra calculadora de **Puntaje a Nota**.
    `,
  },
  {
    slug: 'nem-notas-ensenanza-media-paes',
    title: 'NEM: qué es y cómo se calcula para la PAES',
    description:
      'Descubre qué es el NEM, cómo se calcula y qué peso tiene en el puntaje final de la PAES para entrar a la universidad.',
    keywords: 'NEM, notas enseñanza media, NEM Chile, PAES NEM, cálculo NEM',
    date: '2026-06-22',
    readTime: 5,
    category: 'PAES',
    content: `
El **NEM** (Notas de Enseñanza Media) es uno de los componentes más importantes del
puntaje final para entrar a la universidad en Chile, especialmente con el nuevo sistema PAES.

## ¿Qué es el NEM?

Es el **promedio de tus notas de 1° a 4° medio**, considerando todas las asignaturas.
Representa tu rendimiento académico a lo largo de toda la enseñanza media.

## ¿Cómo se calcula?

> **NEM = (Promedio 1°M + Promedio 2°M + Promedio 3°M + Promedio 4°M) / 4**

También puedes calcularlo con todas las notas de los 4 años:

> **NEM = Σ (todas las notas) / N° total de notas**

Ambas formas dan resultados similares, pero la oficial del DEMRE usa los promedios anuales.

## ¿Qué peso tiene en la PAES?

El puntaje final de la PAES se compone de:

| Componente                 | Peso aproximado |
|----------------------------|-----------------|
| Competencia Lectora        | 10% - 30%       |
| Competencia Matemática 1   | 10% - 30%       |
| Competencia Matemática 2   | 10% - 20%       |
| Ciencias (electiva)        | 10%             |
| **NEM**                    | **10% - 20%**   |
| Ranking de Notas           | 10% - 30%       |

El peso exacto varía según la carrera y universidad a la que postules.

## ¿Cómo subir tu NEM?

El NEM es acumulativo, así que solo puedes mejorarlo con el tiempo. Algunas estrategias:

1. **Estudia regularmente** desde 1° medio, no solo al final.
2. **No dejes asignaturas críticas** (lenguaje y matemáticas) abajo.
3. **Recupera pruebas** cuando tengas la oportunidad.
4. **Busca apoyo** si tienes dificultades en alguna materia.

## ¿Cómo se promedian los puntajes?

El NEM se transforma a puntaje PAES mediante una tabla de conversión del DEMRE.
Un NEM de 6.5 puede equivaler a más de 800 puntos, mientras que un 5.0 alrededor de 600.

## Conclusión

El NEM es un promedio que vale oro en la PAES. Cuídalo desde el primer día de enseñanza
media. Con nuestra calculadora de NEM puedes ver tu estado actual al instante.
    `,
  },
  {
    slug: 'como-eximir-examen-final',
    title: 'Cómo saber si te eximes del examen final (simulador)',
    description:
      'Aprende qué es la eximición, cómo se calcula y si tu promedio te alcanza para no rendir el examen final.',
    keywords: 'eximir examen, eximición chile, simulador eximición, promedio eximición',
    date: '2026-06-24',
    readTime: 4,
    category: 'Calculadoras',
    content: `
La **eximición** es una oportunidad que muchas instituciones entregan a sus estudiantes:
si tu promedio es suficientemente alto, puedes **no rendir el examen final** y tu nota
de presentación se convierte en tu nota final.

## ¿Cómo funciona?

Cada institución define:

- Una **nota mínima de eximición** (generalmente 5.5 o 6.0)
- Las **condiciones** (asistencia, por ejemplo)

Si tu promedio de presentación es **igual o superior** a esa nota mínima, te eximes.

## Cálculo

> **¿Eximido? = (Promedio ≥ Nota mínima de eximición)**

Simple así. Pero el desafío es saber:

1. ¿Cuál es mi promedio acumulado actual?
2. ¿Cuál es la nota mínima de mi institución?
3. ¿Con mis notas actuales, ya me eximo?

## Ejemplo

Tu promedio actual es **5.8** y la nota mínima de eximición es **5.5**.

> 5.8 ≥ 5.5 → **¡Eximido!**

Tu promedio supera la nota mínima por 0.3 puntos. Te eximes.

## ¿Y si no me eximo?

Si no te eximes, **debes rendir el examen final** y tu nota final se calcula combinando
tu promedio de presentación con la nota del examen. Esto puede ayudarte a subir tu promedio,
pero también puede bajarlo.

## Tip estratégico

Si estás muy cerca de la nota de eximición, vale la pena el esfuerzo extra en las
últimas evaluaciones para alcanzarla. Te ahorra tiempo de estudio y estrés.

## Conclusión

La eximición es un beneficio valioso. Verifica constantemente tu promedio para saber
si ya la alcanzaste. Con nuestro **Simulador de Eximición** puedes comprobarlo en segundos.
    `,
  },
]
